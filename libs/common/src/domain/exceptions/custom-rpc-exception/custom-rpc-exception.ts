import { RpcException } from '@nestjs/microservices';
import { ErrorCodeEnum } from '../../enums/common/error-code.enum';

export class CustomRpcException extends RpcException {
  constructor(error: string, public readonly code: ErrorCodeEnum) {
    super({
      error,
      code,
    });
  }
}
