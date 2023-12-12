import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import { AlarmOrderFieldEnum, SortOrder } from '@smart-home.backend/libs/common';
import { IAlarmRepository } from '../../../contracts';
import { AlarmListQuery, AlarmListQueryHandler } from './alarm-list.query';
import { AlarmListQueryInput } from './alarm-list.types';

describe('AlarmListQuery', () => {
  const queryInput: AlarmListQueryInput = {
    page: 0,
    limit: 5,
  };

  const contextId = ContextIdFactory.create();
  let app: TestingModule;
  let query: AlarmListQuery;
  let queryHandler: AlarmListQueryHandler;
  let alarmRepository: IAlarmRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [AlarmListQuery, AlarmListQueryHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);
    alarmRepository = await app.resolve<IAlarmRepository>(IAlarmRepository, contextId);
    queryHandler = await app.resolve<AlarmListQueryHandler>(AlarmListQueryHandler, contextId);

    query = new AlarmListQuery(queryInput);
  });

  it('Should return expected results', async () => {
    const foundData = await queryHandler.execute(query);
    const allData = await alarmRepository.findAll();

    expect(foundData.total).toBe(allData.length);
    expect(foundData.items.length).toBe(5);
  });

  it('Should return results in proper order', async () => {
    queryInput.orderField = AlarmOrderFieldEnum.STATE;
    queryInput.orderDirection = SortOrder.DESC;

    const { items } = await queryHandler.execute(query);

    const expectedOrder = ['ON', 'ARMED', 'OFF'];

    let isSortedCorrectly = true;
    for (let i = 0; i < items.length - 1; i++) {
      if (expectedOrder.indexOf(items[i].state) < expectedOrder.indexOf(items[i + 1].state)) {
        isSortedCorrectly = false;
        break;
      }
    }

    expect(isSortedCorrectly).toBeTruthy();
  });

  afterAll(async () => {
    await app.close();
  });
});
