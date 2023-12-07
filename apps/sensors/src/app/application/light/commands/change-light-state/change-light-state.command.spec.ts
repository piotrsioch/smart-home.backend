import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { v4 } from 'uuid';
import { ILightRepository, ISensorRepository } from '../../../contracts';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import {
  ChangeLightStateCommand,
  ChangeLightStateCommandHandler,
  ChangeLightStateCommandInput,
} from './change-light-state.command';
import { Light } from '../../../../domain';

describe('AddPirSensorDataCommand', () => {
  const commandInput: ChangeLightStateCommandInput = {
    sensorId: '',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let command: ChangeLightStateCommand;
  let commandHandler: ChangeLightStateCommandHandler;
  let sensorRepository: ISensorRepository;
  let lightRepository: ILightRepository;
  let previousData: Light;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [ChangeLightStateCommand, ChangeLightStateCommandHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    sensorRepository = await app.resolve<ISensorRepository>(ISensorRepository, contextId);

    lightRepository = await app.resolve<ILightRepository>(ILightRepository, contextId);

    commandHandler = await app.resolve<ChangeLightStateCommandHandler>(
      ChangeLightStateCommandHandler,
      contextId,
    );

    const [sensor] = await sensorRepository.findAll();
    commandInput.sensorId = sensor._id;

    command = new ChangeLightStateCommand(commandInput);
  });

  it('Should add new light data', async () => {
    await commandHandler.execute(command);

    const foundData = (await lightRepository.findAll()).filter(
      (res) => res.sensorId === commandInput.sensorId,
    );

    previousData = foundData[0];

    expect(foundData.length).toBeGreaterThanOrEqual(1);
  });

  it('Should add new light data', async () => {
    await commandHandler.execute(command);

    const foundData = await lightRepository.findLatestData({
      sensorId: previousData.sensorId,
    });

    expect(foundData.sensorId).toBe(previousData.sensorId);
    expect(foundData.isOn).toBe(!previousData.isOn);
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
