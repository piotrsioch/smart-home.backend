import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import {
  AddPirSensorDataCommand,
  AddPirSensorDataCommandHandler,
  AddPirSensorDataCommandInput,
} from './add-pir-sensor-data.command';
import { IPirSensorRepository, ISensorRepository } from '../../../contracts';
import { PersistenceModule } from '../../../../../infrastructure/persistence/persistence.module';
import { v4 } from 'uuid';

describe('AddPirSensorDataCommand', () => {
  const commandInput: AddPirSensorDataCommandInput = {
    sensorId: '',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let command: AddPirSensorDataCommand;
  let commandHandler: AddPirSensorDataCommandHandler;
  let sensorRepository: ISensorRepository;
  let pirSensorRepository: IPirSensorRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [AddPirSensorDataCommand, AddPirSensorDataCommandHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);
    sensorRepository = await app.resolve<ISensorRepository>(ISensorRepository, contextId);
    pirSensorRepository = await app.resolve<IPirSensorRepository>(IPirSensorRepository, contextId);
    commandHandler = await app.resolve<AddPirSensorDataCommandHandler>(
      AddPirSensorDataCommandHandler,
      contextId,
    );

    const [sensor] = await sensorRepository.findAll();
    commandInput.sensorId = sensor._id;

    command = new AddPirSensorDataCommand(commandInput);
  });

  it('Should add new pir sensor data', async () => {
    await commandHandler.execute(command);

    const foundData = (await pirSensorRepository.findAll()).filter(
      (res) => res.sensorId === commandInput.sensorId,
    );

    expect(foundData.length).toBeGreaterThanOrEqual(1);
  });

  it('Should throw rpc exception', async () => {
    let errMessage: string;
    commandInput.sensorId = v4();

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
