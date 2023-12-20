import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import { Sensor } from '../../../../domain/models/sensors';
import { Room } from '../../../../domain';
import { ISensorRepository } from '../../../sensors';
import { IRoomRepository } from '../../contracts';
import { RpcException } from '@nestjs/microservices';
import {
  RemoveSensorFromRoomCommand,
  RemoveSensorFromRoomCommandHandler,
  RemoveSensorFromRoomCommandInput,
} from './remove-sensor-from-room.command';
import { v4 } from 'uuid';

describe('RemoveSensorFromRoomCommand', () => {
  const commandInput: RemoveSensorFromRoomCommandInput = {
    roomId: '',
    sensorId: '',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let sensor: Sensor;
  let sensor2: Sensor;
  let room: Room;
  let sensorRepository: ISensorRepository;
  let roomRepository: IRoomRepository;
  let command: RemoveSensorFromRoomCommand;
  let commandHandler: RemoveSensorFromRoomCommandHandler;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [RemoveSensorFromRoomCommand, RemoveSensorFromRoomCommandHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    roomRepository = await app.resolve<IRoomRepository>(IRoomRepository, contextId);

    sensorRepository = await app.resolve<ISensorRepository>(ISensorRepository, contextId);

    [room] = await roomRepository.findAll();
    [sensor, sensor2] = await sensorRepository.findAll();

    sensor.roomId = room._id;
    room.sensorsIds.push(sensor._id);

    await sensorRepository.update(sensor._id, sensor);
    await roomRepository.update(room._id, room);

    commandHandler = await app.resolve<RemoveSensorFromRoomCommandHandler>(
      RemoveSensorFromRoomCommandHandler,
      contextId,
    );

    commandInput.roomId = room._id;
    commandInput.sensorId = sensor._id;

    command = new RemoveSensorFromRoomCommand(commandInput);
  });

  it('Should remove sensor from given room', async () => {
    const room = await commandHandler.execute(command);
    const foundSensor = await sensorRepository.findOneById(sensor._id);

    let sensorIdExistsInRoom: boolean;

    room.sensorsIds.forEach((id) => {
      if (id === sensor._id) {
        sensorIdExistsInRoom = true;
      }
    });

    expect(sensorIdExistsInRoom).toBeFalsy();
    expect(foundSensor.roomId).toBeFalsy();
  });

  it('Should throw rpc exception because of wrong sensorId', async () => {
    let errMessage: string;

    commandInput.sensorId = v4();

    try {
      await commandHandler.execute(command);
    } catch (e) {
      errMessage = e;
    }

    expect(errMessage).toBeInstanceOf(RpcException);
  });

  it('Should throw rpc exception because of wrong roomId', async () => {
    let errMessage: string;

    commandInput.roomId = v4();

    try {
      await commandHandler.execute(command);
    } catch (e) {
      errMessage = e;
    }

    expect(errMessage).toBeInstanceOf(RpcException);
  });

  it('Should throw rpc exception because sensor with given id doesnt exist in room sensorsId array', async () => {
    let errMessage: string;

    commandInput.sensorId = sensor2._id;

    try {
      await commandHandler.execute(command);
    } catch (e) {
      errMessage = e;
    }

    expect(errMessage).toBeInstanceOf(RpcException);
  });

  it('Should throw rpc exception because sensor with given id doesnt exist in room sensorsId array', async () => {
    let errMessage: string;

    commandInput.sensorId = sensor2._id;

    try {
      await commandHandler.execute(command);
    } catch (e) {
      errMessage = e;
    }

    expect(errMessage).toBeInstanceOf(RpcException);
  });

  it('Should throw rpc exception because sensor with given id doesnt exist in room sensorsId array', async () => {
    let errMessage: string;

    commandInput.sensorId = sensor2._id;

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
