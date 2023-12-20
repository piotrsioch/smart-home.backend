import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { RoomTypeEnum } from '@smart-home.backend/libs/common';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import {
  CreateRoomCommand,
  CreateRoomCommandHandler,
  CreateRoomCommandInput,
} from './create-room.command';

describe('CreateRoomCommand', () => {
  const commandInput: CreateRoomCommandInput = {
    name: 'lorem',
    roomType: RoomTypeEnum.DiningRoom,
    description: 'loremLorem',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let command: CreateRoomCommand;
  let commandHandler: CreateRoomCommandHandler;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [CreateRoomCommand, CreateRoomCommandHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    commandHandler = await app.resolve<CreateRoomCommandHandler>(
      CreateRoomCommandHandler,
      contextId,
    );

    command = new CreateRoomCommand(commandInput);
  });

  it('Should create a new room', async () => {
    const createdRoom = await commandHandler.execute(command);

    expect(createdRoom.name).toBe(commandInput.name);
    expect(createdRoom.roomType).toBe(commandInput.roomType);
    expect(createdRoom.description).toBe(commandInput.description);
  });

  afterAll(async () => {
    await app.close();
  });
});
