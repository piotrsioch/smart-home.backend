import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import { RpcException } from '@nestjs/microservices';
import { IRoomRepository } from '../../contracts';
import { Room } from '../../../../domain';
import { v4 } from 'uuid';
import { EditRoomCommand, EditRoomCommandHandler, EditRoomCommandInput } from './edit-room.command';

describe('EditRoomCommand', () => {
  const commandInput: EditRoomCommandInput = {
    id: '',
    name: 'New room name',
    description: 'New room description',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let command: EditRoomCommand;
  let commandHandler: EditRoomCommandHandler;
  let roomRepository: IRoomRepository;
  let room: Room;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [EditRoomCommand, EditRoomCommandHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    commandHandler = await app.resolve<EditRoomCommandHandler>(EditRoomCommandHandler, contextId);

    roomRepository = await app.resolve<IRoomRepository>(IRoomRepository, contextId);

    [room] = await roomRepository.findAll();

    commandInput.id = room._id;

    command = new EditRoomCommand(commandInput);
  });

  it('Should edit room', async () => {
    const foundRoom = await commandHandler.execute(command);
    const foundRoomById = await roomRepository.findOneById(room._id);

    expect(foundRoom._id).toBe(foundRoomById._id);
    expect(foundRoom.name).toBe(foundRoomById.name);
    expect(foundRoom.name).toBe(commandInput.name);
    expect(foundRoom.description).toBe(commandInput.description);
    expect(foundRoom._id).toBe(room._id);
  });

  it('Should throw rpc exception because of wrong data', async () => {
    let errMessage: string;

    commandInput.name = '';
    commandInput.description = '';

    try {
      await commandHandler.execute(command);
    } catch (e) {
      errMessage = e;
    }

    expect(errMessage).toBeInstanceOf(RpcException);
  });

  it('Should throw rpc exception because of wrong roomId', async () => {
    let errMessage: string;

    commandInput.name = 'Name';
    commandInput.description = 'Description';
    commandInput.id = v4();

    try {
      await commandHandler.execute(command);
    } catch (e) {
      errMessage = e;
    }

    expect(errMessage).toBeInstanceOf(RpcException);
  });

  afterAll(async () => {
    await app.close();
  });
});
