import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { v4 } from 'uuid';
import { IAlarmRepository, ISensorRepository } from '../../../contracts';
import { PersistenceModule } from '../../../../infrastructure/persistence/persistence.module';
import { Alarm } from '../../../../domain';
import {
  GetAlarmStateQuery,
  GetAlarmStateQueryHandler,
  GetAlarmStateQueryInput,
} from './get-alarm-state.query';
import { AlarmStateEnum } from '@smart-home.backend/libs/common';

describe('GetAlarmStateQuery', () => {
  const queryInput: GetAlarmStateQueryInput = {
    sensorId: '',
  };

  const contextId = ContextIdFactory.create();

  let app: TestingModule;
  let query: GetAlarmStateQuery;
  let queryHandler: GetAlarmStateQueryHandler;
  let sensorRepository: ISensorRepository;
  let alarmRepository: IAlarmRepository;
  let newlyCreatedRecord: Alarm;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PersistenceModule, CqrsModule],
      providers: [GetAlarmStateQuery, GetAlarmStateQueryHandler],
    }).compile();

    await app.init();

    jest.spyOn(ContextIdFactory, 'getByRequest').mockImplementation(() => contextId);

    sensorRepository = await app.resolve<ISensorRepository>(ISensorRepository, contextId);

    alarmRepository = await app.resolve<IAlarmRepository>(IAlarmRepository, contextId);

    queryHandler = await app.resolve<GetAlarmStateQueryHandler>(
      GetAlarmStateQueryHandler,
      contextId,
    );

    const [sensor] = await sensorRepository.findAll();
    queryInput.sensorId = sensor._id;

    query = new GetAlarmStateQuery(queryInput);

    newlyCreatedRecord = Alarm.create({
      sensorId: sensor._id,
      state: AlarmStateEnum.ON,
    });

    await alarmRepository.add(newlyCreatedRecord);
  });

  it('Should return the newest alarm data', async () => {
    const dataFromQuery = await queryHandler.execute(query);

    expect(dataFromQuery._id).toBe(newlyCreatedRecord._id);
    expect(dataFromQuery.sensorId).toBe(newlyCreatedRecord.sensorId);
    expect(dataFromQuery.state).toBe(newlyCreatedRecord.state);
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
