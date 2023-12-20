import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { ISensorRepository } from '../../../sensors';
import { IRoomRepository } from '../../contracts';
import { CustomRpcException, ErrorCodeEnum, SuccessDto } from '@smart-home.backend/libs/common';

export type DeleteRoomCommandInput = {
  roomId: string;
};

export class DeleteRoomCommand implements ICommand {
  constructor(public readonly input: DeleteRoomCommandInput) {}
}

@CommandHandler(DeleteRoomCommand)
export class DeleteRoomCommandHandler implements ICommandHandler<DeleteRoomCommand, SuccessDto> {
  constructor(
    private readonly sensorRepository: ISensorRepository,
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(command: DeleteRoomCommand): Promise<SuccessDto> {
    const { roomId } = command.input;

    const room = await this.roomRepository.findOneById(roomId);

    if (!room) {
      throw new CustomRpcException('Room with given id does not exist', ErrorCodeEnum.NOT_FOUND);
    }

    for (const sensorId of room.sensorsIds) {
      const sensor = await this.sensorRepository.findOneById(sensorId);

      sensor.roomId = null;

      await this.sensorRepository.update(sensor._id, sensor);
    }

    await this.roomRepository.remove(room);

    const dto = new SuccessDto();

    dto.success = true;

    return dto;
  }
}
