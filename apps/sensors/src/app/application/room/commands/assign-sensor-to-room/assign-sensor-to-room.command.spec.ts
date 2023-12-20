import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import { RpcException } from '@nestjs/microservices';
import {
  AssignSensorToRoomCommand,
  AssignSensorToRoomCommandHandler,
  AssignSensorToRoomCommandInput,
} from './assign-sensor-to-room.command';
import { ISensorRepository } from '../../../sensors';
import { IRoomRepository } from '../../contracts';
import { Sensor } from '../../../../domain/models/sensors';
import { Room } from '../../../../domain';
import { v4 } from 'uuid';

describe('AssignSensorToRoomCommand', () => {
  const commandInput: AssignSensorToRoomCommandInput = {
    sensorId: '',
    roomId: '',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let command: AssignSensorToRoomCommand;
  let commandHandler: AssignSensorToRoomCommandHandler;
  let sensorRepository: ISensorRepository;
  let roomRepository: IRoomRepository;
  let sensor: Sensor;
  let room: Room;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [AssignSensorToRoomCommand, AssignSensorToRoomCommandHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    commandHandler = await app.resolve<AssignSensorToRoomCommandHandler>(
      AssignSensorToRoomCommandHandler,
      contextId,
    );

    roomRepository = await app.resolve<IRoomRepository>(IRoomRepository, contextId);

    sensorRepository = await app.resolve<ISensorRepository>(ISensorRepository, contextId);

    [room] = await roomRepository.findAll();
    [sensor] = await sensorRepository.findAll();

    commandInput.roomId = room._id;
    commandInput.sensorId = sensor._id;

    command = new AssignSensorToRoomCommand(commandInput);
  });

  it('Should assign sensor to room', async () => {
    const room = await commandHandler.execute(command);
    const foundSensor = await sensorRepository.findOneById(sensor._id);

    let sensorIdExistsInRoomArray: boolean;

    room.sensorsIds.forEach((sensorId) => {
      if (sensorId === sensor._id) {
        sensorIdExistsInRoomArray = true;
      }
    });

    expect(sensorIdExistsInRoomArray).toBeTruthy();
    expect(foundSensor.roomId).toBe(room._id);
  });

  it('Should throw rpc exception because of multiple assignment', async () => {
    let errMessage: string;

    try {
      await commandHandler.execute(command);
    } catch (e) {
      errMessage = e;
    }

    expect(errMessage).toBeInstanceOf(RpcException);
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

  afterAll(async () => {
    await app.close();
  });
});
