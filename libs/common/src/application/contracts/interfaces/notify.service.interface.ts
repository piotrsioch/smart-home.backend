export type SendMessageInput = {
  phoneNumber: string;
  message: string;
};

export interface INotifyService {
  sendMessage(input: SendMessageInput): Promise<void>;
}

export abstract class INotifyService implements INotifyService {}
