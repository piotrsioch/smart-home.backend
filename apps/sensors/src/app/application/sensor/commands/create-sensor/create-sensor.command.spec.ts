import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CreateSensorCommand,
  CreateSensorCommandHandler,
  CreateSensorCommandInput,
} from './create-sensor.command';
import { SensorTypeEnum } from '@smart-home.backend/libs/common';
import { ISensorRepository } from '../../../contracts';
import { RpcException } from '@nestjs/microservices';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';

describe('CreateSensorCommand', () => {
  const commandInput: CreateSensorCommandInput = {
    id: 'asd2131asdas',
    type: SensorTypeEnum.DHT_SENSOR,
    location: 'Kitchen',
    name: 'balublabla',
  };

  const contextId = ContextIdFactory.create();
  let app: TestingModule;
  let command: CreateSensorCommand;
  let commandHandler: CreateSensorCommandHandler;
  let sensorRepository: ISensorRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [CreateSensorCommand, CreateSensorCommandHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);
    sensorRepository = await app.resolve<ISensorRepository>(ISensorRepository, contextId);
    commandHandler = await app.resolve<CreateSensorCommandHandler>(
      CreateSensorCommandHandler,
      contextId,
    );

    command = new CreateSensorCommand(commandInput);
  });

  it('Should create new sensor', async () => {
    await commandHandler.execute(command);

    const foundData = await sensorRepository.findOneById(commandInput.id);

    expect(foundData._id === commandInput.id);
    expect(foundData.name === commandInput.name);
  });

  it('Should throw rpc exception', async () => {
    let errMessage: string;

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
