import {
  AddDhtSensorDataCommand,
  AddDhtSensorDataCommandHandler,
  AddDhtSensorDataCommandInput,
} from './add-dht-sensor-data.command';
import { IDhtSensorRepository, ISensorRepository } from '../../contracts';
import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import { CqrsModule } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { v4 } from 'uuid';

describe('AddDhtSensorDataCommand', () => {
  const commandInput: AddDhtSensorDataCommandInput = {
    temperature: 25,
    humidity: 25,
    sensorId: '',
  };

  const contextId = ContextIdFactory.create();
  let app: TestingModule;
  let command: AddDhtSensorDataCommand;
  let commandHandler: AddDhtSensorDataCommandHandler;
  let dhtSensorRepository: IDhtSensorRepository;
  let sensorRepository: ISensorRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [AddDhtSensorDataCommand, AddDhtSensorDataCommandHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    dhtSensorRepository = await app.resolve<IDhtSensorRepository>(IDhtSensorRepository, contextId);

    sensorRepository = await app.resolve<ISensorRepository>(ISensorRepository, contextId);

    commandHandler = await app.resolve<AddDhtSensorDataCommandHandler>(
      AddDhtSensorDataCommandHandler,
      contextId,
    );

    const [sensor] = await sensorRepository.findAll();
    commandInput.sensorId = sensor._id;

    command = new AddDhtSensorDataCommand(commandInput);
  });

  it('Should add new dht sensor data', async () => {
    await commandHandler.execute(command);

    const foundData = (await dhtSensorRepository.findAll()).filter(
      (data) =>
        data.temperature === commandInput.temperature &&
        data.sensorId === commandInput.sensorId &&
        data.humidity === commandInput.humidity,
    );

    expect(foundData.length).toBeGreaterThan(0);
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
