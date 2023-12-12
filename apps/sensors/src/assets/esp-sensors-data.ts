import { SensorTypeEnum } from '@smart-home.backend/libs/common';
import { SensorCreateInput } from '../app/domain/models/sensors';

const reedSwitchId = process.env.REED_SWITCH_ID || 'RS_001';
const dhtSensorId = process.env.DHT_SENSOR_ID || 'DHT_001';
const lightId = process.env.LIGHT_ID || 'L_001';
const pirSensorId = process.env.PIR_SENSOR_ID || 'PIR_001';
const smokeSensorId = process.env.SMOKE_SENSOR_ID || 'SMOKE_001';

export const espSensorsData: SensorCreateInput[] = [
  {
    id: reedSwitchId,
    type: SensorTypeEnum.REED_SWITCH,
    name: 'Open/close sensor in the window',
    location: 'Kitchen',
  },
  {
    id: dhtSensorId,
    type: SensorTypeEnum.DHT_SENSOR,
    name: 'Temperature and humidity sensor in the living room',
    location: 'Living room',
  },
  {
    id: lightId,
    type: SensorTypeEnum.LIGHT,
    name: 'Light in the living room',
    location: 'Living room',
  },
  {
    id: pirSensorId,
    type: SensorTypeEnum.PIR_SENSOR,
    name: 'Move detection sensor',
    location: 'Living room',
  },
  {
    id: smokeSensorId,
    type: SensorTypeEnum.MQ_SENSOR,
    name: 'Smoke sensor in kitchen',
    location: 'Kitchen',
  },
];
