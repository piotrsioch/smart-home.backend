import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import { NotificationsOrderFieldEnum, SortOrder } from '@smart-home.backend/libs/common';
import { NotificationListQuery, NotificationListQueryHandler } from './notification-list.query';
import { NotificationListQueryInput } from './notification-list.types';
import { INotificationRepository } from '../../../contracts/repositories';

describe('NotificationListQuery', () => {
  const queryInput: NotificationListQueryInput = {
    page: 0,
    limit: 5,
  };

  const contextId = ContextIdFactory.create();
  let app: TestingModule;
  let query: NotificationListQuery;
  let queryHandler: NotificationListQueryHandler;
  let notificationRepository: INotificationRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [NotificationListQuery, NotificationListQueryHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);
    notificationRepository = await app.resolve<INotificationRepository>(
      INotificationRepository,
      contextId,
    );
    queryHandler = await app.resolve<NotificationListQueryHandler>(
      NotificationListQueryHandler,
      contextId,
    );

    query = new NotificationListQuery(queryInput);
  });

  it('Should return expected results', async () => {
    const foundData = await queryHandler.execute(query);
    const allData = await notificationRepository.findAll();

    expect(foundData.total).toBe(allData.length);
    expect(foundData.items.length).toBe(5);
  });

  it('Should return results in proper order', async () => {
    queryInput.orderField = NotificationsOrderFieldEnum.SENSOR_ID;
    queryInput.orderDirection = SortOrder.DESC;

    const { items } = await queryHandler.execute(query);

    const isInProperOrder = items[0].sensorId > items[1].sensorId;

    expect(isInProperOrder).toBeTruthy();
  });

  afterAll(async () => {
    await app.close();
  });
});
