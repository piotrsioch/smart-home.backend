import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../../../../../infrastructure/persistence/persistence.module';
import { ReedSwitchOrderFieldEnum, SortOrder } from '@smart-home.backend/libs/common';
import { IReedSwitchRepository } from '../../../contracts';
import { ReedSwitchListQuery, ReedSwitchListQueryHandler } from './reed-switch-list.query';
import { ReedSwitchListQueryInput } from './reed-switch-list.types';

describe('ReedSwitchListQuery', () => {
  const queryInput: ReedSwitchListQueryInput = {
    page: 0,
    limit: 5,
  };

  const contextId = ContextIdFactory.create();
  let app: TestingModule;
  let query: ReedSwitchListQuery;
  let queryHandler: ReedSwitchListQueryHandler;
  let reedSwitchRepository: IReedSwitchRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [ReedSwitchListQuery, ReedSwitchListQueryHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);
    reedSwitchRepository = await app.resolve<IReedSwitchRepository>(
      IReedSwitchRepository,
      contextId,
    );
    queryHandler = await app.resolve<ReedSwitchListQueryHandler>(
      ReedSwitchListQueryHandler,
      contextId,
    );

    query = new ReedSwitchListQuery(queryInput);
  });

  it('Should return expected results', async () => {
    const foundData = await queryHandler.execute(query);
    const allData = await reedSwitchRepository.findAll();

    expect(foundData.total).toBe(allData.length);
    expect(foundData.items.length).toBe(5);
  });

  it('Should return results in proper order', async () => {
    queryInput.orderField = ReedSwitchOrderFieldEnum.IS_OPENED;
    queryInput.orderDirection = SortOrder.DESC;

    const { items } = await queryHandler.execute(query);

    const firstFalseIndex = items.findIndex((item) => item.isOpened === false);

    const allTrueBeforeFirstFalse =
      firstFalseIndex === -1 ||
      items.slice(0, firstFalseIndex).every((item) => item.isOpened === true);

    const allFalseFromFirstFalse =
      firstFalseIndex === -1 ||
      items.slice(firstFalseIndex).every((item) => item.isOpened === false);

    expect(allTrueBeforeFirstFalse).toBeTruthy();
    expect(allFalseFromFirstFalse).toBeTruthy();
  });

  afterAll(async () => {
    await app.close();
  });
});
