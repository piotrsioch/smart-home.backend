import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { v4 } from 'uuid';
import { IReedSwitchRepository, ISensorRepository } from '../../../contracts';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import { ReedSwitch } from '../../../../domain';
import {
  GetLatestReedSwitchDataQuery,
  GetLatestReedSwitchDataQueryHandler,
  GetLatestReedSwitchDataQueryInput,
} from './get-latest-reed-switch-data.query';

describe('GetLatestReedSwitchDataQuery', () => {
  const queryInput: GetLatestReedSwitchDataQueryInput = {
    sensorId: '',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let query: GetLatestReedSwitchDataQuery;
  let queryHandler: GetLatestReedSwitchDataQueryHandler;
  let sensorRepository: ISensorRepository;
  let reedSwitchRepository: IReedSwitchRepository;
  let newlyCreatedRecord: ReedSwitch;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [GetLatestReedSwitchDataQuery, GetLatestReedSwitchDataQueryHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    sensorRepository = await app.resolve<ISensorRepository>(ISensorRepository, contextId);

    reedSwitchRepository = await app.resolve<IReedSwitchRepository>(
      IReedSwitchRepository,
      contextId,
    );

    queryHandler = await app.resolve<GetLatestReedSwitchDataQueryHandler>(
      GetLatestReedSwitchDataQueryHandler,
      contextId,
    );

    const [sensor] = await sensorRepository.findAll();
    queryInput.sensorId = sensor._id;

    query = new GetLatestReedSwitchDataQuery(queryInput);

    newlyCreatedRecord = ReedSwitch.create({
      sensorId: sensor._id,
      isOpened: true,
    });

    await reedSwitchRepository.add(newlyCreatedRecord);
  });

  it('Should return the newest reed switch data', async () => {
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
