import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const rabbitmqOptions = (queueName: string): MicroserviceOptions => {
  const RABBITMQ_HOST = process.env.RABBITMQ_HOST;
  const RABBITMQ_PORT = process.env.RABBITMQ_PORT;

  const RABBITMQ_URL = `amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

  return {
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: queueName,
      queueOptions: {
        durable: true,
      },
    },
  };
};
