import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { ISensorRepository } from '../../../sensors';
import { IRoomRepository } from '../../contracts';
import { Room } from '../../../../domain';
import { CustomRpcException, ErrorCodeEnum } from '@smart-home.backend/libs/common';

export type AssignSensorToRoomCommandInput = {
  sensorId: string;
  roomId: string;
};

export class AssignSensorToRoomCommand implements ICommand {
  constructor(public readonly input: AssignSensorToRoomCommandInput) {}
}

@CommandHandler(AssignSensorToRoomCommand)
export class AssignSensorToRoomCommandHandler
  implements ICommandHandler<AssignSensorToRoomCommand, Room>
{
  constructor(
    private readonly sensorRepository: ISensorRepository,
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(command: AssignSensorToRoomCommand): Promise<Room> {
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

    if (sensorIdExistsInRoomArray) {
      throw new CustomRpcException('Given is already assigned to room', ErrorCodeEnum.BAD_REQUEST);
    }

    room.sensorsIds.push(sensorId);

    sensor.roomId = roomId;

    await this.sensorRepository.update(sensor._id, sensor);

    await this.roomRepository.update(room._id, room);

    return room;
  }
}
