import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { INotifyService, SendMessageInput } from '../../../application/contracts/interfaces';

@Injectable()
export class NotifyService implements INotifyService {
  private senderPhoneNumber: string;
  private readonly client: Twilio;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID || 'ACTEST';
    const authToken = process.env.TWILIO_AUTH_TOKEN || 'TEST';

    this.senderPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    this.client = new Twilio(accountSid, authToken);
  }

  public async sendMessage(input: SendMessageInput): Promise<void> {
    const { phoneNumber, message } = input;

    await this.client.messages.create({
      to: phoneNumber,
      from: this.senderPhoneNumber,
      body: message,
    });
  }
}
