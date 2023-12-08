import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Light } from '../../../../domain';
import { ILightRepository, ISensorRepository } from '../../../contracts';
import { CustomRpcException, ErrorCodeEnum } from '@smart-home.backend/libs/common';

export type ChangeLightStateCommandInput = {
  sensorId: string;
};

export class ChangeLightStateCommand implements ICommand {
  constructor(public readonly input: ChangeLightStateCommandInput) {}
}

@CommandHandler(ChangeLightStateCommand)
export class ChangeLightStateCommandHandler
  implements ICommandHandler<ChangeLightStateCommand, Light>
{
  constructor(
    private readonly sensorRepository: ISensorRepository,
    private readonly lightRepository: ILightRepository,
  ) {}

  async execute(command: ChangeLightStateCommand): Promise<Light> {
    const { sensorId } = command.input;

    const existingSensor = await this.sensorRepository.findOneById(sensorId);

    if (!existingSensor) {
      throw new CustomRpcException('Sensor with given id does not exist', ErrorCodeEnum.NOT_FOUND);
    }

    const sensorData = await this.lightRepository.findLatestData({
      sensorId,
    });

    const isOn = sensorData ? !sensorData.isOn : false;

    const dataToSave = Light.create({
      sensorId,
      isOn,
    });

    await this.lightRepository.add(dataToSave);

    return dataToSave;
  }
}
