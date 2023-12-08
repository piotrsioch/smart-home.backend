import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { CustomRpcException } from '../../../domain/exceptions';
import { ErrorCodeEnum } from '../../../domain/enums/common';

@Catch(CustomRpcException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomRpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = 500;
    if (exception.code) {
      switch (exception.code) {
        case ErrorCodeEnum.NOT_FOUND:
          status = 404;
          break;
        case ErrorCodeEnum.BAD_REQUEST:
          status = 400;
          break;
        case ErrorCodeEnum.UNAUTHORIZED:
          status = 401;
          break;
        default:
          status = 500;
      }
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
