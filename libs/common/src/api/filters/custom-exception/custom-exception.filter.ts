import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ErrorCodeEnum } from '@smart-home.backend/libs/common';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const { message, code } = exception;

    let status: number;

    switch (code) {
      case ErrorCodeEnum.BAD_REQUEST:
        status = 400;
        break;
      case ErrorCodeEnum.NOT_FOUND:
        status = 404;
        break;
      case ErrorCodeEnum.UNAUTHORIZED:
        status = 401;
        break;
      default:
        status = 500;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
