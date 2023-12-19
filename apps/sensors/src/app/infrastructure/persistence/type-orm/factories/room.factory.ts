import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Room } from '../../../../domain';
import { RoomEntity } from '../entities/room.entity';
import { RoomTypeEnum } from '@smart-home.backend/libs/common';

@Injectable()
export class RoomFactory {
  create(): RoomEntity {
    const room = new Room();

    const enumValues = Object.values(RoomTypeEnum);

    const randomIndex = Math.floor(Math.random() * enumValues.length);

    room.create();

    room.roomType = enumValues[randomIndex];
    room.name = faker.word.noun();
    room.description = faker.lorem.words(5);
    room.sensorsIds = [];

    return room;
  }
}
