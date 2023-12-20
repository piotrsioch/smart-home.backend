import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import {
  DeleteRoomCommand,
  DeleteRoomCommandHandler,
  DeleteRoomCommandInput,
} from './delete-room.command';
import { Sensor } from '../../../../domain/models/sensors';
import { Room } from '../../../../domain';
import { ISensorRepository } from '../../../sensors';
import { IRoomRepository } from '../../contracts';
import { RpcException } from '@nestjs/microservices';

describe('DeleteRoomCommand', () => {
  const commandInput: DeleteRoomCommandInput = {
    roomId: '',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let sensor1: Sensor;
  let sensor2: Sensor;
  let room1: Room;
  let room2: Room;
  let sensorRepository: ISensorRepository;
  let roomRepository: IRoomRepository;
  let command: DeleteRoomCommand;
  let commandHandler: DeleteRoomCommandHandler;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [DeleteRoomCommand, DeleteRoomCommandHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    roomRepository = await app.resolve<IRoomRepository>(IRoomRepository, contextId);

    sensorRepository = await app.resolve<ISensorRepository>(ISensorRepository, contextId);

    [room1, room2] = await roomRepository.findAll();
    [sensor1, sensor2] = await sensorRepository.findAll();

    sensor1.roomId = room2._id;
    sensor2.roomId = room2._id;

    await sensorRepository.update(sensor1._id, sensor1);
    await sensorRepository.update(sensor2._id, sensor2);

    room2.sensorsIds.push(sensor1._id, sensor2._id);

    await roomRepository.update(room2._id, room2);

    commandHandler = await app.resolve<DeleteRoomCommandHandler>(
      DeleteRoomCommandHandler,
      contextId,
    );

    commandInput.roomId = room1._id;

    command = new DeleteRoomCommand(commandInput);
  });

  it('Should delete room without assigned sensors', async () => {
    const successDto = await commandHandler.execute(command);

    const foundRoom = await roomRepository.findOneById(room1._id);

    expect(successDto.success).toBeTruthy();

    expect(foundRoom).toBeFalsy();
  });

  it('Should delete room and also change roomId field of assigned sensors', async () => {
    commandInput.roomId = room2._id;

    const successDto = await commandHandler.execute(command);

    const foundRoom = await roomRepository.findOneById(room2._id);
    const updatedSensor1 = await sensorRepository.findOneById(sensor1._id);
    const updatedSensor2 = await sensorRepository.findOneById(sensor2._id);

    expect(successDto.success).toBeTruthy();
    expect(foundRoom).toBeFalsy();
    expect(updatedSensor1.roomId).toBeFalsy();
    expect(updatedSensor2.roomId).toBeFalsy();
  });

  it('Should throw rpc exception', async () => {
    let errMessage: string;

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
