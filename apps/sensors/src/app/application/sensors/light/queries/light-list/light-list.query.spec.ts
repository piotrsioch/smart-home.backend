import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../../../../../infrastructure/persistence/persistence.module';
import { LightOrderFieldEnum, SortOrder } from '@smart-home.backend/libs/common';
import { ILightRepository } from '../../../contracts';
import { LightListQuery, LightListQueryHandler } from './light-list.query';
import { LightListQueryInput } from './light-list.types';

describe('LightListQuery', () => {
  const queryInput: LightListQueryInput = {
    page: 0,
    limit: 5,
  };

  const contextId = ContextIdFactory.create();
  let app: TestingModule;
  let query: LightListQuery;
  let queryHandler: LightListQueryHandler;
  let lightRepository: ILightRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [LightListQuery, LightListQueryHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);
    lightRepository = await app.resolve<ILightRepository>(ILightRepository, contextId);
    queryHandler = await app.resolve<LightListQueryHandler>(LightListQueryHandler, contextId);

    query = new LightListQuery(queryInput);
  });

  it('Should return expected results', async () => {
    const foundData = await queryHandler.execute(query);
    const allData = await lightRepository.findAll();

    expect(foundData.total).toBe(allData.length);
    expect(foundData.items.length).toBe(5);
  });

  it('Should return results in proper order', async () => {
    queryInput.orderField = LightOrderFieldEnum.IS_ON;
    queryInput.orderDirection = SortOrder.DESC;

    const { items } = await queryHandler.execute(query);

    const firstFalseIndex = items.findIndex((item) => item.isOn === false);

    const allTrueBeforeFirstFalse =
      firstFalseIndex === -1 || items.slice(0, firstFalseIndex).every((item) => item.isOn === true);

    const allFalseFromFirstFalse =
      firstFalseIndex === -1 || items.slice(firstFalseIndex).every((item) => item.isOn === false);

    expect(allTrueBeforeFirstFalse).toBeTruthy();
    expect(allFalseFromFirstFalse).toBeTruthy();
  });

  afterAll(async () => {
    await app.close();
  });
});
