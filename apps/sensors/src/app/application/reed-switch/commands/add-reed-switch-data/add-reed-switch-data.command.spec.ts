import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { v4 } from 'uuid';
import {
  AddReedSwitchDataCommand,
  AddReedSwitchDataCommandHandler,
  AddReedSwitchDataCommandInput,
} from './add-reed-switch-data.command';
import { IReedSwitchRepository, ISensorRepository } from '../../../contracts';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';

describe('AddPirSensorDataCommand', () => {
  const commandInput: AddReedSwitchDataCommandInput = {
    sensorId: '',
    isOpened: true,
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let command: AddReedSwitchDataCommand;
  let commandHandler: AddReedSwitchDataCommandHandler;
  let sensorRepository: ISensorRepository;
  let reedSwitchRepository: IReedSwitchRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [AddReedSwitchDataCommand, AddReedSwitchDataCommandHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    sensorRepository = await app.resolve<ISensorRepository>(ISensorRepository, contextId);

    reedSwitchRepository = await app.resolve<IReedSwitchRepository>(
      IReedSwitchRepository,
      contextId,
    );

    commandHandler = await app.resolve<AddReedSwitchDataCommandHandler>(
      AddReedSwitchDataCommandHandler,
      contextId,
    );

    const [sensor] = await sensorRepository.findAll();
    commandInput.sensorId = sensor._id;

    command = new AddReedSwitchDataCommand(commandInput);
  });

  it('Should add new pir sensor data', async () => {
    await commandHandler.execute(command);

    const foundData = (await reedSwitchRepository.findAll()).filter(
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
