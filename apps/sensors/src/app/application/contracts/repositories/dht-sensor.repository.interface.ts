import { IModelRepository } from "@smart-home.backend/libs/common";
import { DhtSensor } from "../../../domain/models";

export interface IDhtSensorRepository extends IModelRepository<DhtSensor> {}

export abstract class IDhtSensorRepository implements IDhtSensorRepository {}