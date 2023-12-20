import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { v4 } from 'uuid';
import { RoomTypeEnum } from '@smart-home.backend/libs/common';
import {
  GetRoomByIdQuery,
  GetRoomByIdQueryHandler,
  GetRoomByIdQueryInput,
} from './get-room-by-id.query';
import { IRoomRepository } from '../../contracts';
import { Room } from '../../../../domain';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';

describe('GetRoomByIdQuery', () => {
  const queryInput: GetRoomByIdQueryInput = {
    id: '',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let query: GetRoomByIdQuery;
  let queryHandler: GetRoomByIdQueryHandler;
  let roomRepository: IRoomRepository;
  let newlyCreatedRecord: Room;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [GetRoomByIdQuery, GetRoomByIdQueryHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    roomRepository = await app.resolve<IRoomRepository>(IRoomRepository, contextId);

    queryHandler = await app.resolve<GetRoomByIdQueryHandler>(GetRoomByIdQueryHandler, contextId);

    newlyCreatedRecord = Room.create({
      name: 'lorem',
      roomType: RoomTypeEnum.DiningRoom,
    });

    await roomRepository.add(newlyCreatedRecord);

    queryInput.id = newlyCreatedRecord._id;

    query = new GetRoomByIdQuery(queryInput);
  });

  it('Should return the newest room', async () => {
    const dataFromQuery = await queryHandler.execute(query);

    expect(dataFromQuery._id).toBe(newlyCreatedRecord._id);
    expect(dataFromQuery.name).toBe(newlyCreatedRecord.name);
    expect(dataFromQuery.roomType).toBe(newlyCreatedRecord.roomType);
  });

  it('Should throw rpc exception', async () => {
    let errMessage: string;
    queryInput.id = v4();

    try {
      await queryHandler.execute(query);
    } catch (e) {
      errMessage = e;
    }

    expect(errMessage).toBeInstanceOf(RpcException);
  });

  afterAll(async () => {
    await app.close();
  });
});
