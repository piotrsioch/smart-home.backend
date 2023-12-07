import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { v4 } from 'uuid';
import { IDhtSensorRepository, ISensorRepository } from '../../../contracts';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import { DhtSensor } from '../../../../domain';
import {
  GetLatestDhtDataQuery,
  GetLatestDhtDataQueryHandler,
  GetLatestDhtDataQueryInput,
} from './get-latest-dht-data.query';

describe('GetLatestDhtDataQuery', () => {
  const queryInput: GetLatestDhtDataQueryInput = {
    sensorId: '',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let query: GetLatestDhtDataQuery;
  let queryHandler: GetLatestDhtDataQueryHandler;
  let sensorRepository: ISensorRepository;
  let dhtSensorRepository: IDhtSensorRepository;
  let newlyCreatedRecord: DhtSensor;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [GetLatestDhtDataQuery, GetLatestDhtDataQueryHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    sensorRepository = await app.resolve<ISensorRepository>(ISensorRepository, contextId);

    dhtSensorRepository = await app.resolve<IDhtSensorRepository>(IDhtSensorRepository, contextId);

    queryHandler = await app.resolve<GetLatestDhtDataQueryHandler>(
      GetLatestDhtDataQueryHandler,
      contextId,
    );

    const [sensor] = await sensorRepository.findAll();
    queryInput.sensorId = sensor._id;

    query = new GetLatestDhtDataQuery(queryInput);

    newlyCreatedRecord = DhtSensor.create({
      sensorId: sensor._id,
      temperature: 25,
      humidity: 10,
    });

    await dhtSensorRepository.add(newlyCreatedRecord);
  });

  it('Should return the newest dht sensor data', async () => {
    const dataFromQuery = await queryHandler.execute(query);

    expect(dataFromQuery._id).toBe(newlyCreatedRecord._id);
    expect(dataFromQuery.sensorId).toBe(newlyCreatedRecord.sensorId);
  });

  it('Should throw rpc exception', async () => {
    let errMessage: string;
    queryInput.sensorId = v4();

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
