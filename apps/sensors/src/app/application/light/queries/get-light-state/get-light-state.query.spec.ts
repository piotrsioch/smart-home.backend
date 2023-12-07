import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { v4 } from 'uuid';
import { ILightRepository, ISensorRepository } from '../../../contracts';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import { Light } from '../../../../domain';
import {
  GetLightStateQuery,
  GetLightStateQueryHandler,
  GetLightStateQueryInput,
} from './get-light-state.query';

describe('GetLightStateQuery', () => {
  const queryInput: GetLightStateQueryInput = {
    sensorId: '',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let query: GetLightStateQuery;
  let queryHandler: GetLightStateQueryHandler;
  let sensorRepository: ISensorRepository;
  let lightRepository: ILightRepository;
  let newlyCreatedRecord: Light;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [GetLightStateQuery, GetLightStateQueryHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    sensorRepository = await app.resolve<ISensorRepository>(ISensorRepository, contextId);

    lightRepository = await app.resolve<ILightRepository>(ILightRepository, contextId);

    queryHandler = await app.resolve<GetLightStateQueryHandler>(
      GetLightStateQueryHandler,
      contextId,
    );

    const [sensor] = await sensorRepository.findAll();
    queryInput.sensorId = sensor._id;

    query = new GetLightStateQuery(queryInput);

    newlyCreatedRecord = Light.create({
      sensorId: sensor._id,
      isOn: false,
    });

    await lightRepository.add(newlyCreatedRecord);
  });

  it('Should return the newest light data', async () => {
    const dataFromQuery = await queryHandler.execute(query);

    expect(dataFromQuery._id).toBe(newlyCreatedRecord._id);
    expect(dataFromQuery.sensorId).toBe(newlyCreatedRecord.sensorId);
    expect(dataFromQuery.isOn).toBe(newlyCreatedRecord.isOn);
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
