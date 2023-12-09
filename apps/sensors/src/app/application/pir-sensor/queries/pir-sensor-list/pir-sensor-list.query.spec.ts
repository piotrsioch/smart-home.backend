import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import { PirSensorOrderFieldEnum, SortOrder } from '@smart-home.backend/libs/common';
import { IPirSensorRepository } from '../../../contracts';
import { PirSensorListQueryInput } from './pir-sensor-list.types';
import { PirSensorListQuery, PirSensorListQueryHandler } from './pir-sensor-list.query';

describe('PirSensorListQuery', () => {
  const queryInput: PirSensorListQueryInput = {
    page: 0,
    limit: 5,
  };

  const contextId = ContextIdFactory.create();
  let app: TestingModule;
  let query: PirSensorListQuery;
  let queryHandler: PirSensorListQueryHandler;
  let pirSensorRepository: IPirSensorRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [PirSensorListQuery, PirSensorListQueryHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);
    pirSensorRepository = await app.resolve<IPirSensorRepository>(IPirSensorRepository, contextId);
    queryHandler = await app.resolve<PirSensorListQueryHandler>(
      PirSensorListQueryHandler,
      contextId,
    );

    query = new PirSensorListQuery(queryInput);
  });

  it('Should return expected results', async () => {
    const foundData = await queryHandler.execute(query);
    const allData = await pirSensorRepository.findAll();

    expect(foundData.total).toBe(allData.length);
    expect(foundData.items.length).toBe(5);
  });

  it('Should return results in proper order', async () => {
    queryInput.orderField = PirSensorOrderFieldEnum.CREATED_AT;
    queryInput.orderDirection = SortOrder.DESC;

    const { items } = await queryHandler.execute(query);

    let previousItem;

    items.forEach((item) => {
      if (previousItem == null) {
        previousItem = item;
        return;
      }

      const currentIsLessOrEqualPrevious = item.createdAt <= previousItem.createdAt;
      expect(currentIsLessOrEqualPrevious).toBeTruthy();

      previousItem = item;
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
