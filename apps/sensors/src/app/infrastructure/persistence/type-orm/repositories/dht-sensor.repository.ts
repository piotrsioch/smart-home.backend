import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { DhtSensorEntity } from "../entities/dht-sensor.entity";
import { IGenericRepository } from "@smart-home.backend/libs/common";

@Injectable()
export class DhtSensorRepository implements IGenericRepository<DhtSensorEntity>{
}