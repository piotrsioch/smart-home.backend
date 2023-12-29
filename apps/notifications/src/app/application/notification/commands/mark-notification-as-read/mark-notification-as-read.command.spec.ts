import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import { INotificationRepository } from '../../../contracts/repositories';
import { NotifyServiceModule } from '../../../../infrastructure/notify-service';
import {
  MarkNotificationAsReadCommand,
  MarkNotificationAsReadCommandHandler,
  MarkNotificationAsReadCommandInput,
} from './mark-notification-as-read.command';
import { Notification } from '../../../../domain';
import { v4 } from 'uuid';
import { RpcException } from '@nestjs/microservices';

describe('MarkNotificationAsReadCommand', () => {
  const commandInput: MarkNotificationAsReadCommandInput = {
    id: '',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let command: MarkNotificationAsReadCommand;
  let commandHandler: MarkNotificationAsReadCommandHandler;
  let notificationRepository: INotificationRepository;
  let notification: Notification;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule, NotifyServiceModule],
      providers: [MarkNotificationAsReadCommand, MarkNotificationAsReadCommandHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    notificationRepository = await app.resolve<INotificationRepository>(
      INotificationRepository,
      contextId,
    );

    commandHandler = await app.resolve<MarkNotificationAsReadCommandHandler>(
      MarkNotificationAsReadCommandHandler,
      contextId,
    );

    [notification] = await notificationRepository.findAll();

    commandInput.id = notification._id;

    command = new MarkNotificationAsReadCommand(commandInput);
  });

  it('Should change notification isRead state to opposite', async () => {
    await commandHandler.execute(command);

    const foundNotification = await notificationRepository.findOneById(notification._id);

    expect(foundNotification._id).toBe(notification._id);
    expect(foundNotification.isRead).toBe(!notification.isRead);
  });

  it('Should set notification isRead state to false', async () => {
    commandInput.state = false;

    await commandHandler.execute(command);

    const foundNotification = await notificationRepository.findOneById(notification._id);

    expect(foundNotification._id).toBe(notification._id);
    expect(foundNotification.isRead).toBeFalsy();
  });

  it('Should throw custom rpc exception because of wrong id', async () => {
    let errMessage: string;
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
