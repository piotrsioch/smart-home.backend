import { BaseModel } from '@smart-home.backend/libs/common';

export type NotificationCreateInput = {
  name: string;
  message: string;
  receiver: string;
  sensorId: string;
};

export class Notification extends BaseModel {
  name: string;
  message: string;
  receiver: string;
  sensorId: string;

  static create(input: NotificationCreateInput): Notification {
    const { name, message, receiver, sensorId } = input;

    const _this = new Notification();

    _this.create();

    _this.name = name;
    _this.message = message;
    _this.receiver = receiver;
    _this.sensorId = sensorId;

    return _this;
  }
}
