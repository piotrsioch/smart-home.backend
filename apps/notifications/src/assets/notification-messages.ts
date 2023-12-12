export enum NotificationTypeEnum {
  SMOKE_SENSOR = 'smokeSensor',
  PIR_SENSOR = 'pirSensor',
}

const notificationMessages: Map<NotificationTypeEnum, string> = new Map([
  [
    NotificationTypeEnum.SMOKE_SENSOR,
    'ATTENTION! Smoke detected from the sensor named ${sensorName}. Event date ${date}.',
  ],
  [
    NotificationTypeEnum.PIR_SENSOR,
    'ATTENTION! Motion detected from the sensor named ${sensorName}. Event date ${date}.',
  ],
]);

export type createNotificationMessageInput = {
  type: NotificationTypeEnum;
  sensorName: string;
  date: string;
};

export async function createNotificationMessage(
  input: createNotificationMessageInput,
): Promise<string> {
  const { type, sensorName, date } = input;

  const template = notificationMessages.get(type);

  return template.replace('${sensorName}', sensorName).replace('${date}', date);
}
