import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import { INotificationRepository } from '../../../contracts/repositories';
import { RpcException } from '@nestjs/microservices';
import {
  DeleteNotificationCommand,
  DeleteNotificationCommandHandler,
  DeleteNotificationCommandInput,
} from './delete-notification.command';

describe('DeleteNotificationCommand', () => {
  const commandInput: DeleteNotificationCommandInput = {
    id: '',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let command: DeleteNotificationCommand;
  let commandHandler: DeleteNotificationCommandHandler;
  let notificationRepository: INotificationRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [DeleteNotificationCommand, DeleteNotificationCommandHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    notificationRepository = await app.resolve<INotificationRepository>(
      INotificationRepository,
      contextId,
    );

    commandHandler = await app.resolve<DeleteNotificationCommandHandler>(
      DeleteNotificationCommandHandler,
      contextId,
    );

    const [notification] = await notificationRepository.findAll();

    commandInput.id = notification._id;

    command = new DeleteNotificationCommand(commandInput);
  });

  it('Should delete notification', async () => {
    await commandHandler.execute(command);

    const foundNotification = await notificationRepository.findOneById(commandInput.id);

    expect(foundNotification).toBeFalsy();
  });

  it('Should throw custom rpc exception', async () => {
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
