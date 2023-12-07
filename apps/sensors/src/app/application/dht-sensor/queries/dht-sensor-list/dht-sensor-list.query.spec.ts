import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { DhtSensorListQuery, DhtSensorListQueryHandler } from './dht-sensor-list.query';
import { DhtSensorListQueryInput } from './dht-sensor-list.types';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import { DhtSensorOrderFieldEnum, SortOrder } from '@smart-home.backend/libs/common';
import { IDhtSensorRepository } from '../../../contracts';

describe('DhtSensorListQuery', () => {
  const queryInput: DhtSensorListQueryInput = {
    page: 0,
    limit: 5,
  };

  const contextId = ContextIdFactory.create();
  let app: TestingModule;
  let query: DhtSensorListQuery;
  let queryHandler: DhtSensorListQueryHandler;
  let dhtSensorRepository: IDhtSensorRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [DhtSensorListQuery, DhtSensorListQueryHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);
    dhtSensorRepository = await app.resolve<IDhtSensorRepository>(IDhtSensorRepository, contextId);
    queryHandler = await app.resolve<DhtSensorListQueryHandler>(
      DhtSensorListQueryHandler,
      contextId,
    );

    query = new DhtSensorListQuery(queryInput);
  });

  it('Should return expected results', async () => {
    const foundData = await queryHandler.execute(query);
    const allData = await dhtSensorRepository.findAll();

    expect(foundData.total).toBe(allData.length);
    expect(foundData.items.length).toBe(5);
  });

  it('Should return results in proper order', async () => {
    queryInput.orderField = DhtSensorOrderFieldEnum.TEMPERATURE;
    queryInput.orderDirection = SortOrder.DESC;

    const { items } = await queryHandler.execute(query);

    expect(items[0].temperature).toBeGreaterThanOrEqual(items[1].temperature);
  });

  afterAll(async () => {
    await app.close();
  });
});
