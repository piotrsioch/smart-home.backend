import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { v4 } from 'uuid';
import {
  EditSensorCommand,
  EditSensorCommandHandler,
  EditSensorCommandInput,
} from './edit-sensor.command';
import { ISensorRepository } from '../../../contracts';
import { Sensor } from '../../../../../domain/models/sensors';
import { PersistenceModule } from '../../../../../infrastructure/persistence/persistence.module';

describe('EditSensorCommand', () => {
  const commandInput: EditSensorCommandInput = {
    id: '',
    name: 'New sensor name',
    location: 'New sensor description',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let command: EditSensorCommand;
  let commandHandler: EditSensorCommandHandler;
  let sensorRepository: ISensorRepository;
  let sensor: Sensor;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [EditSensorCommand, EditSensorCommandHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    commandHandler = await app.resolve<EditSensorCommandHandler>(
      EditSensorCommandHandler,
      contextId,
    );

    sensorRepository = await app.resolve<ISensorRepository>(ISensorRepository, contextId);

    [sensor] = await sensorRepository.findAll();

    commandInput.id = sensor._id;

    command = new EditSensorCommand(commandInput);
  });

  it('Should edit room', async () => {
    const foundSensor = await commandHandler.execute(command);
    const foundSensorByID = await sensorRepository.findOneById(sensor._id);

    expect(foundSensor._id).toBe(foundSensorByID._id);
    expect(foundSensor.name).toBe(foundSensorByID.name);
    expect(foundSensor.name).toBe(commandInput.name);
    expect(foundSensor.location).toBe(commandInput.location);
    expect(foundSensor._id).toBe(sensor._id);
  });

  it('Should throw rpc exception because of wrong data', async () => {
    let errMessage: string;

    commandInput.name = '';
    commandInput.location = '';

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
    commandInput.location = 'Description';
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
