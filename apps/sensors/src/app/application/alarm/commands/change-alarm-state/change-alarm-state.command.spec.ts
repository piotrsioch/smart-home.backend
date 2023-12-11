import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { v4 } from 'uuid';
import { IAlarmRepository, ISensorRepository } from '../../../contracts';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import {
  ChangeAlarmStateCommand,
  ChangeAlarmStateCommandHandler,
  ChangeAlarmStateCommandInput,
} from './change-alarm-state.command';
import { Alarm } from '../../../../domain/models/alarm';

describe('ChangeAlarmStateCommand', () => {
  const commandInput: ChangeAlarmStateCommandInput = {
    sensorId: '',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let command: ChangeAlarmStateCommand;
  let commandHandler: ChangeAlarmStateCommandHandler;
  let sensorRepository: ISensorRepository;
  let alarmRepository: IAlarmRepository;
  let previousData: Alarm;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [ChangeAlarmStateCommand, ChangeAlarmStateCommandHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    sensorRepository = await app.resolve<ISensorRepository>(ISensorRepository, contextId);

    alarmRepository = await app.resolve<IAlarmRepository>(IAlarmRepository, contextId);

    commandHandler = await app.resolve<ChangeAlarmStateCommandHandler>(
      ChangeAlarmStateCommandHandler,
      contextId,
    );

    const [sensor] = await sensorRepository.findAll();
    commandInput.sensorId = sensor._id;

    command = new ChangeAlarmStateCommand(commandInput);
  });

  it('Should add new alarm data', async () => {
    await commandHandler.execute(command);

    const foundData = (await alarmRepository.findAll()).filter(
      (res) => res.sensorId === commandInput.sensorId,
    );

    previousData = foundData[0];

    expect(foundData.length).toBeGreaterThanOrEqual(1);
  });

  it('Should add new alarm data', async () => {
    await commandHandler.execute(command);

    const foundData = await alarmRepository.findLatestData({
      sensorId: previousData.sensorId,
    });

    expect(foundData.sensorId).toBe(previousData.sensorId);
    expect(foundData.isActive).toBe(!previousData.isActive);
  });

  it('isActive property should be true', async () => {
    commandInput.desiredState = true;

    await commandHandler.execute(command);

    const foundData = await alarmRepository.findLatestData({
      sensorId: previousData.sensorId,
    });

    expect(foundData.sensorId).toBe(previousData.sensorId);
    expect(foundData.isActive).toBeTruthy();
  });

  it('isActive property should be false', async () => {
    commandInput.desiredState = false;

    await commandHandler.execute(command);

    const foundData = await alarmRepository.findLatestData({
      sensorId: previousData.sensorId,
    });

    expect(foundData.sensorId).toBe(previousData.sensorId);
    expect(foundData.isActive).toBeFalsy();
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
