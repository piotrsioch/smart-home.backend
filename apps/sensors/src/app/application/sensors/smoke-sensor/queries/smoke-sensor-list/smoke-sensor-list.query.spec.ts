import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../../../../../infrastructure/persistence/persistence.module';
import { SmokeSensorOrderFieldEnum, SortOrder } from '@smart-home.backend/libs/common';
import { ISmokeSensorRepository } from '../../../contracts';
import { SmokeSensorListQuery, SmokeSensorListQueryHandler } from './smoke-sensor-list.query';
import { SmokeSensorListQueryInput } from './smoke-sensor-list.types';

describe('DhtSensorListQuery', () => {
  const queryInput: SmokeSensorListQueryInput = {
    page: 0,
    limit: 5,
  };

  const contextId = ContextIdFactory.create();
  let app: TestingModule;
  let query: SmokeSensorListQuery;
  let queryHandler: SmokeSensorListQueryHandler;
  let smokeSensorRepository: ISmokeSensorRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [SmokeSensorListQuery, SmokeSensorListQueryHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);
    smokeSensorRepository = await app.resolve<ISmokeSensorRepository>(
      ISmokeSensorRepository,
      contextId,
    );
    queryHandler = await app.resolve<SmokeSensorListQueryHandler>(
      SmokeSensorListQueryHandler,
      contextId,
    );

    query = new SmokeSensorListQuery(queryInput);
  });

  it('Should return expected results', async () => {
    const foundData = await queryHandler.execute(query);
    const allData = await smokeSensorRepository.findAll();

    expect(foundData.total).toBe(allData.length);
    expect(foundData.items.length).toBe(5);
  });

  it('Should return results in proper order', async () => {
    queryInput.orderField = SmokeSensorOrderFieldEnum.VALUE;
    queryInput.orderDirection = SortOrder.DESC;

    const { items } = await queryHandler.execute(query);

    expect(items[0].value).toBeGreaterThanOrEqual(items[1].value);
  });

  afterAll(async () => {
    await app.close();
  });
});
