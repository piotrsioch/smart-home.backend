import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { RoomOrderFieldEnum, RoomTypeEnum, SortOrder } from '@smart-home.backend/libs/common';
import { RoomListQueryInput } from './room-list.types';
import { RoomListQuery, RoomListQueryHandler } from './room-list.query';
import { IRoomRepository } from '../../contracts';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';

describe('RoomListQuery', () => {
  const queryInput: RoomListQueryInput = {
    page: 0,
    limit: 5,
  };

  const contextId = ContextIdFactory.create();
  let app: TestingModule;
  let query: RoomListQuery;
  let queryHandler: RoomListQueryHandler;
  let roomRepository: IRoomRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [RoomListQuery, RoomListQueryHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);
    roomRepository = await app.resolve<IRoomRepository>(IRoomRepository, contextId);
    queryHandler = await app.resolve<RoomListQueryHandler>(RoomListQueryHandler, contextId);

    query = new RoomListQuery(queryInput);
  });

  it('Should return expected results', async () => {
    const foundData = await queryHandler.execute(query);
    const allData = await roomRepository.findAll();

    expect(foundData.total).toBe(allData.length);
    expect(foundData.items.length).toBe(5);
  });

  it('Should return results in proper order', async () => {
    queryInput.orderField = RoomOrderFieldEnum.ROOM_TYPE;
    queryInput.orderDirection = SortOrder.ASC;

    const { items } = await queryHandler.execute(query);

    const expectedOrder = Object.values(RoomTypeEnum).sort();

    let isSortedCorrectly = true;
    for (let i = 0; i < items.length - 1; i++) {
      if (expectedOrder.indexOf(items[i].roomType) > expectedOrder.indexOf(items[i + 1].roomType)) {
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
