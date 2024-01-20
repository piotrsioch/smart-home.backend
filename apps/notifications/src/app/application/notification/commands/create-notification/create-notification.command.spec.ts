import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import { INotificationRepository } from '../../../contracts/repositories';
import { NotifyServiceModule } from '../../../../infrastructure/notify-service';
import {
  CreateNotificationCommand,
  CreateNotificationCommandHandler,
  CreateNotificationCommandInput,
} from './create-notification.command';
import { RpcException } from '@nestjs/microservices';

describe('CreateNotificationCommand', () => {
  const commandInput: CreateNotificationCommandInput = {
    phoneNumber: '666666666',
    message: 'Hello. Welcome from test',
    sensorId: '123',
    name: 'random',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let command: CreateNotificationCommand;
  let commandHandler: CreateNotificationCommandHandler;
  let notificationRepository: INotificationRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [CreateNotificationCommand, CreateNotificationCommandHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    notificationRepository = await app.resolve<INotificationRepository>(
      INotificationRepository,
      contextId,
    );

    commandHandler = await app.resolve<CreateNotificationCommandHandler>(
      CreateNotificationCommandHandler,
      contextId,
    );

    command = new CreateNotificationCommand(commandInput);
  });

  it('Should add new notification', async () => {
    await commandHandler.execute(command);

    const foundData = (await notificationRepository.findAll()).filter(
      (res) => res.sensorId === commandInput.sensorId,
    );

    expect(foundData.length).toBeGreaterThanOrEqual(1);
  });

  afterAll(async () => {
    await app.close();
  });
});
