import { RpcException } from '@nestjs/microservices';
import { ErrorCodeEnum } from '../../enums/common/error-code.enum';

export class CustomRpcException extends RpcException {
  constructor(message: string, public readonly code: ErrorCodeEnum) {
    super({
      message,
      code,
    });
  }
}
