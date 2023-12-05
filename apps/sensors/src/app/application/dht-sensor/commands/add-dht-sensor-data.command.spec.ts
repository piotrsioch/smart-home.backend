import {
  AddDhtSensorDataCommand,
  AddDhtSensorDataCommandHandler,
  AddDhtSensorDataCommandInput,
} from './add-dht-sensor-data.command';
import { IDhtSensorRepository } from '../../contracts';
import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { PersistenceModule } from '../../../infrastructure/persistence/persistence.module';
import { CqrsModule } from '@nestjs/cqrs';

describe('AddDhtSensorDataCommand', () => {
  const commandInput: AddDhtSensorDataCommandInput = {
    temperature: '25',
    humidity: '25',
    sensorId: '9',
  };

  const contextId = ContextIdFactory.create();
  let app: TestingModule;
  let command: AddDhtSensorDataCommand;
  let commandHandler: AddDhtSensorDataCommandHandler;
  let dhtSensorRepository: IDhtSensorRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [AddDhtSensorDataCommand, AddDhtSensorDataCommandHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);
    dhtSensorRepository = await app.resolve<IDhtSensorRepository>(IDhtSensorRepository, contextId);
    commandHandler = await app.resolve<AddDhtSensorDataCommandHandler>(
      AddDhtSensorDataCommandHandler,
      contextId,
    );

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

  afterAll(async () => {
    await app.close();
  });
});
