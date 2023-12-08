import { CustomRpcException, ErrorCodeEnum } from '@smart-home.backend/libs/common';
import { Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(CustomRpcException)
export class TestExceptionFilter implements ExceptionFilter {
  catch(exception: CustomRpcException) {
    let status: number;

    switch (exception.code) {
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

    const error = exception.getError() as { message: string; code: string };

    return new RpcException({
      message: error.message,
      status,
    });
  }
}
