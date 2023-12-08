import { CustomRpcException } from '@smart-home.backend/libs/common';
import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch(CustomRpcException)
export class CustomRpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: CustomRpcException) {
    return throwError(() => exception.getError());
  }
}
