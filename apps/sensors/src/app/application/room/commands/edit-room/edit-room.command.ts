import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { IRoomRepository } from '../../contracts';
import { CustomRpcException, ErrorCodeEnum, RoomTypeEnum } from '@smart-home.backend/libs/common';
import { Room } from '../../../../domain';

export type EditRoomCommandInput = {
  roomId: string;
  name?: string;
  roomType?: RoomTypeEnum;
  description?: string;
};

export class EditRoomCommand implements ICommand {
  constructor(public readonly input: EditRoomCommandInput) {}
}

@CommandHandler(EditRoomCommand)
export class EditRoomCommandHandler implements ICommandHandler<EditRoomCommand, Room> {
  constructor(private readonly roomRepository: IRoomRepository) {}

  async execute(command: EditRoomCommand): Promise<Room> {
    const { roomId, name, roomType, description } = command.input;

    const room = await this.roomRepository.findOneById(roomId);

    if (!room) {
      throw new CustomRpcException('Room with given id does not exist', ErrorCodeEnum.NOT_FOUND);
    }

    if (!(name || roomType || description)) {
      throw new CustomRpcException('No data passed', ErrorCodeEnum.BAD_REQUEST);
    }

    room.name = name ?? room.name;
    room.roomType = roomType ?? room.roomType;
    room.description = description ?? room.description;

    await this.roomRepository.update(room._id, room);

    return room;
  }
}
