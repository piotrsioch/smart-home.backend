import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import { INotificationRepository } from '../../../contracts/repositories';
import {
  GetUnreadNotificationsQuery,
  GetUnreadNotificationsQueryHandler,
} from './get-unread-notifications.query';

describe('GetUnreadNotificationsQuery', () => {
  const contextId = ContextIdFactory.create();
  let app: TestingModule;
  let query: GetUnreadNotificationsQuery;
  let queryHandler: GetUnreadNotificationsQueryHandler;
  let notificationRepository: INotificationRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [GetUnreadNotificationsQuery, GetUnreadNotificationsQueryHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);
    notificationRepository = await app.resolve<INotificationRepository>(
      INotificationRepository,
      contextId,
    );
    queryHandler = await app.resolve<GetUnreadNotificationsQueryHandler>(
      GetUnreadNotificationsQueryHandler,
      contextId,
    );

    const [notification] = await notificationRepository.findAll();
    notification.isRead = true;
    await notificationRepository.update(notification._id, notification);

    query = new GetUnreadNotificationsQuery();
  });

  it('Should return expected results', async () => {
    const unreadNotifications = await queryHandler.execute(query);
    const allData = await notificationRepository.findAll();

    const areAllFoundNotificationsUnread = unreadNotifications.filter(
      (notification) => notification.isRead === false,
    );

    expect(unreadNotifications.length).toBe(allData.length - 1);
    expect(areAllFoundNotificationsUnread.length).toBe(unreadNotifications.length);
  });

  afterAll(async () => {
    await app.close();
  });
});
