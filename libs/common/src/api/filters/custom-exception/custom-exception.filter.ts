import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('in catch');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    console.log(exception);

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
