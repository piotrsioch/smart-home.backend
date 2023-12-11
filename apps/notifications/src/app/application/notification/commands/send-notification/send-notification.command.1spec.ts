// messages are being sent each time test is being run - it is commented out because sending messages is not free

// import { ContextIdFactory } from '@nestjs/core';
// import { Test, TestingModule } from '@nestjs/testing';
// import { CqrsModule } from '@nestjs/cqrs';
// import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
// import {
//   SendNotificationCommand,
//   SendNotificationCommandHandler,
//   SendNotificationCommandInput,
// } from './send-notification.command';
// import { INotificationRepository } from '../../../contracts/repositories';
// import { NotifyServiceModule } from '../../../../infrastructure/notify-service';
//
// describe('SendNotificationCommand', () => {
//   const commandInput: SendNotificationCommandInput = {
//     phoneNumber: '666666666',
//     message: 'Hello. Welcome from test',
//     sensorId: '255',
//     name: 'random',
//   };
//
//   const contextId = ContextIdFactory.create();
//
//   let app: TestingModule;
//   let command: SendNotificationCommand;
//   let commandHandler: SendNotificationCommandHandler;
//   let notificationRepository: INotificationRepository;
//
//   beforeAll(async () => {
//     app = await Test.createTestingModule({
//       imports: [PersistenceModule, CqrsModule, NotifyServiceModule],
//       providers: [SendNotificationCommand, SendNotificationCommandHandler],
//     }).compile();
//
//     await app.init();
//
//     jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);
//
//     notificationRepository = await app.resolve<INotificationRepository>(
//       INotificationRepository,
//       contextId,
//     );
//
//     commandHandler = await app.resolve<SendNotificationCommandHandler>(
//       SendNotificationCommandHandler,
//       contextId,
//     );
//
//     command = new SendNotificationCommand(commandInput);
//   });
//
//   it('Should add new notification', async () => {
//     await commandHandler.execute(command);
//
//     const foundData = (await notificationRepository.findAll()).filter(
//       (res) => res.sensorId === commandInput.sensorId,
//     );
//
//     expect(foundData.length).toBeGreaterThanOrEqual(1);
//   });
//
//   afterAll(async () => {
//     await app.close();
//   });
// });
