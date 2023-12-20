import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { ISensorRepository } from '../../../sensors';
import { IRoomRepository } from '../../contracts';
import { Room } from '../../../../domain';
import { CustomRpcException, ErrorCodeEnum } from '@smart-home.backend/libs/common';

export type RemoveSensorFromRoomCommandInput = {
  sensorId: string;
  roomId: string;
};

export class RemoveSensorFromRoomCommand implements ICommand {
  constructor(public readonly input: RemoveSensorFromRoomCommandInput) {}
}

@CommandHandler(RemoveSensorFromRoomCommand)
export class RemoveSensorFromRoomCommandHandler
  implements ICommandHandler<RemoveSensorFromRoomCommand, Room>
{
  constructor(
    private readonly sensorRepository: ISensorRepository,
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(command: RemoveSensorFromRoomCommand): Promise<Room> {
    const { sensorId, roomId } = command.input;

    const sensor = await this.sensorRepository.findOneById(sensorId);

    const room = await this.roomRepository.findOneById(roomId);

    if (!sensor || !room) {
      throw new CustomRpcException(
        'Sensor/room with given id does not exist',
        ErrorCodeEnum.NOT_FOUND,
      );
    }

    let sensorIdExistsInRoomArray: boolean;

    room.sensorsIds.forEach((sensorIdFromArray: string) => {
      if (sensorIdFromArray === sensorId) {
        sensorIdExistsInRoomArray = true;
      }
    });

    if (!sensor.roomId || !sensorIdExistsInRoomArray) {
      throw new CustomRpcException(
        'Sensor with given id is not assigned to room with given id',
        ErrorCodeEnum.BAD_REQUEST,
      );
    }

    room.sensorsIds = room.sensorsIds.filter((item: string) => item !== sensorId);

    sensor.roomId = null;

    await this.sensorRepository.update(sensor._id, sensor);

    await this.roomRepository.update(room._id, room);

    return room;
  }
}
