import { BaseModel } from '@smart-home.backend/libs/common';

export type ReedSwitchCreateInput = {
  isOpened: boolean;
  sensorId: string;
};

export class ReedSwitch extends BaseModel {
  isOpened: boolean;
  sensorId: string;

  static create(input: ReedSwitchCreateInput): ReedSwitch {
    const { isOpened, sensorId } = input;

    const _this = new ReedSwitch();

    _this.create();

    _this.isOpened = isOpened;
    _this.sensorId = sensorId;

    return _this;
  }
}
