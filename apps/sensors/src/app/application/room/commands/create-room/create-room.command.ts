import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { IRoomRepository } from '../../contracts';
import { Room } from '../../../../domain';
import { RoomTypeEnum } from '@smart-home.backend/libs/common';

export type CreateRoomCommandInput = {
  name: string;
  roomType: RoomTypeEnum;
  description?: string;
};

export class CreateRoomCommand implements ICommand {
  constructor(public readonly input: CreateRoomCommandInput) {}
}

@CommandHandler(CreateRoomCommand)
export class CreateRoomCommandHandler implements ICommandHandler<CreateRoomCommand, Room> {
  constructor(private readonly roomRepository: IRoomRepository) {}

  async execute(command: CreateRoomCommand): Promise<Room> {
    const { name, roomType, description } = command.input;

    const room = Room.create({
      name,
      roomType,
      description,
    });

    await this.roomRepository.add(room);

    return room;
  }
}
