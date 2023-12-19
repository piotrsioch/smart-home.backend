import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { v4 } from 'uuid';
import {
  AddSmokeSensorDataCommand,
  AddSmokeSensorDataCommandHandler,
  AddSmokeSensorDataCommandInput,
} from './add-smoke-sensor-data.command';
import { ISensorRepository, ISmokeSensorRepository } from '../../../contracts';
import { PersistenceModule } from '../../../../../infrastructure/persistence/persistence.module';

describe('AddSmokeSensorDataCommand', () => {
  const commandInput: AddSmokeSensorDataCommandInput = {
    sensorId: '',
    value: 950,
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let command: AddSmokeSensorDataCommand;
  let commandHandler: AddSmokeSensorDataCommandHandler;
  let sensorRepository: ISensorRepository;
  let smokeSensorRepository: ISmokeSensorRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [AddSmokeSensorDataCommand, AddSmokeSensorDataCommandHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);
    sensorRepository = await app.resolve<ISensorRepository>(ISensorRepository, contextId);
    smokeSensorRepository = await app.resolve<ISmokeSensorRepository>(
      ISmokeSensorRepository,
      contextId,
    );
    commandHandler = await app.resolve<AddSmokeSensorDataCommandHandler>(
      AddSmokeSensorDataCommandHandler,
      contextId,
    );

    const [sensor] = await sensorRepository.findAll();
    commandInput.sensorId = sensor._id;

    command = new AddSmokeSensorDataCommand(commandInput);
  });

  it('Should add new smoke sensor data', async () => {
    await commandHandler.execute(command);

    const foundData = (await smokeSensorRepository.findAll()).filter(
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
