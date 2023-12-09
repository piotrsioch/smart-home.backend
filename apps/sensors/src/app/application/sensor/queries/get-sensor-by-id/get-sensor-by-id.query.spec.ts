import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { v4 } from 'uuid';
import { ISensorRepository } from '../../../contracts';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import {
  GetSensorByIdQuery,
  GetSensorByIdQueryHandler,
  GetSensorByIdQueryInput,
} from './get-sensor-by-id.query';
import { Sensor } from '../../../../domain/models/sensors';

describe('GetSensorByIdQuery', () => {
  const queryInput: GetSensorByIdQueryInput = {
    id: '',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let query: GetSensorByIdQuery;
  let queryHandler: GetSensorByIdQueryHandler;
  let sensorRepository: ISensorRepository;
  let sensor: Sensor;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [GetSensorByIdQuery, GetSensorByIdQueryHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    sensorRepository = await app.resolve<ISensorRepository>(ISensorRepository, contextId);

    queryHandler = await app.resolve<GetSensorByIdQueryHandler>(
      GetSensorByIdQueryHandler,
      contextId,
    );

    [sensor] = await sensorRepository.findAll();
    queryInput.id = sensor._id;

    query = new GetSensorByIdQuery(queryInput);
  });

  it('Should return the newest dht sensor data', async () => {
    const sensorFromQuery = await queryHandler.execute(query);

    expect(sensorFromQuery._id).toBe(sensor._id);
    expect(sensorFromQuery.name).toBe(sensor.name);
    expect(sensorFromQuery.location).toBe(sensor.location);
    expect(sensorFromQuery.type).toBe(sensor.type);
  });

  it('Should throw rpc exception', async () => {
    let errMessage: string;
    queryInput.id = v4();

    try {
      await queryHandler.execute(query);
    } catch (e) {
      errMessage = e;
    }

    expect(errMessage).toBeInstanceOf(RpcException);
  });

  afterAll(async () => {
    await app.close();
  });
});
