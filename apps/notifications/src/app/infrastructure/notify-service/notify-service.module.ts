import { Module } from '@nestjs/common';
import { INotifyService, NotifyService } from '@smart-home.backend/libs/common';

const service = [
  {
    provide: INotifyService,
    useClass: NotifyService,
  },
];

@Module({
  providers: [...service],
  exports: [...service],
})
export class NotifyServiceModule {}
