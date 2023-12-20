import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../../../../../infrastructure/persistence/persistence.module';
import { SensorOrderFieldEnum, SortOrder } from '@smart-home.backend/libs/common';
import { ISensorRepository } from '../../../contracts';
import { SensorListQuery, SensorListQueryHandler } from './sensor-list.query';
import { SensorListQueryInput } from './sensor-list.types';

describe('SensorListQuery', () => {
  const queryInput: SensorListQueryInput = {
    page: 0,
    limit: 5,
  };

  const contextId = ContextIdFactory.create();
  let app: TestingModule;
  let query: SensorListQuery;
  let queryHandler: SensorListQueryHandler;
  let sensorRepository: ISensorRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [SensorListQuery, SensorListQueryHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);
    sensorRepository = await app.resolve<ISensorRepository>(ISensorRepository, contextId);
    queryHandler = await app.resolve<SensorListQueryHandler>(SensorListQueryHandler, contextId);

    query = new SensorListQuery(queryInput);
  });

  it('Should return expected results', async () => {
    const foundData = await queryHandler.execute(query);
    const allData = await sensorRepository.findAll();

    expect(foundData.total).toBe(allData.length);
    expect(foundData.items.length).toBe(5);
  });

  it('Should return results in proper order', async () => {
    queryInput.orderField = SensorOrderFieldEnum.NAME;
    queryInput.orderDirection = SortOrder.DESC;

    const { items } = await queryHandler.execute(query);

    const isSortedInProperOrder = items[0].name >= items[1].name;

    expect(isSortedInProperOrder).toBeTruthy();
  });

  afterAll(async () => {
    await app.close();
  });
});
