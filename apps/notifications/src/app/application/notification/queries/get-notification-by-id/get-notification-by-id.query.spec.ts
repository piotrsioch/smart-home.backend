import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { v4 } from 'uuid';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import {
  GetNotificationByIdQuery,
  GetNotificationByIdQueryHandler,
  GetNotificationByIdQueryInput,
} from './get-notification-by-id.query';
import { INotificationRepository } from '../../../contracts/repositories';
import { Notification } from '../../../../domain';

describe('GetNotificationByIdQuery', () => {
  const queryInput: GetNotificationByIdQueryInput = {
    id: '',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let query: GetNotificationByIdQuery;
  let queryHandler: GetNotificationByIdQueryHandler;
  let notificationRepository: INotificationRepository;
  let notification: Notification;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [GetNotificationByIdQuery, GetNotificationByIdQueryHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    notificationRepository = await app.resolve<INotificationRepository>(
      INotificationRepository,
      contextId,
    );

    queryHandler = await app.resolve<GetNotificationByIdQueryHandler>(
      GetNotificationByIdQueryHandler,
      contextId,
    );

    [notification] = await notificationRepository.findAll();
    queryInput.id = notification._id;

    query = new GetNotificationByIdQuery(queryInput);
  });

  it('Should return proper notification data', async () => {
    const notificationFromQuery = await queryHandler.execute(query);

    expect(notificationFromQuery._id).toBe(notification._id);
    expect(notificationFromQuery.name).toBe(notification.name);
    expect(notificationFromQuery.message).toBe(notification.message);
    expect(notificationFromQuery.receiver).toBe(notification.receiver);
  });

  it('Should throw rpc exception', async () => {
    let errMessage: string;
    queryInput.id = v4();

    try {
      await queryHandler.execute(query);
    } catch (e) {
      errMessage = e;
    }

    expect(errMessage).toBeInstanceOf(RpcException);
  });

  afterAll(async () => {
    await app.close();
  });
});
