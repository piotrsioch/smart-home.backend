import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { v4 } from 'uuid';
import { ISensorRepository, ISmokeSensorRepository } from '../../../contracts';
import { PersistenceModule } from '../../../../../infrastructure/persistence/persistence.module';
import { SmokeSensor } from '../../../../../domain';
import {
  GetLatestSmokeDataQuery,
  GetLatestSmokeDataQueryHandler,
  GetLatestSmokeDataQueryInput,
} from './get-latest-smoke-data.query';

describe('GetLatestSmokeDataQuery', () => {
  const queryInput: GetLatestSmokeDataQueryInput = {
    sensorId: '',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let query: GetLatestSmokeDataQuery;
  let queryHandler: GetLatestSmokeDataQueryHandler;
  let sensorRepository: ISensorRepository;
  let smokeSensorRepository: ISmokeSensorRepository;
  let newlyCreatedRecord: SmokeSensor;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [GetLatestSmokeDataQuery, GetLatestSmokeDataQueryHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    sensorRepository = await app.resolve<ISensorRepository>(ISensorRepository, contextId);

    smokeSensorRepository = await app.resolve<ISmokeSensorRepository>(
      ISmokeSensorRepository,
      contextId,
    );

    queryHandler = await app.resolve<GetLatestSmokeDataQueryHandler>(
      GetLatestSmokeDataQueryHandler,
      contextId,
    );

    const [sensor] = await sensorRepository.findAll();
    queryInput.sensorId = sensor._id;

    query = new GetLatestSmokeDataQuery(queryInput);

    newlyCreatedRecord = SmokeSensor.create({
      sensorId: sensor._id,
      value: 800,
    });

    await smokeSensorRepository.add(newlyCreatedRecord);
  });

  it('Should return the newest smoke sensor data', async () => {
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
