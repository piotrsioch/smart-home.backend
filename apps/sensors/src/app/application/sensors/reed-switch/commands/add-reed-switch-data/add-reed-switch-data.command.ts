import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { ReedSwitch } from '../../../../../domain';
import { IReedSwitchRepository, ISensorRepository } from '../../../contracts';
import { CustomRpcException, ErrorCodeEnum } from '@smart-home.backend/libs/common';

export type AddReedSwitchDataCommandInput = {
  sensorId: string;
  isOpened: boolean;
};

export class AddReedSwitchDataCommand implements ICommand {
  constructor(public readonly input: AddReedSwitchDataCommandInput) {}
}

@CommandHandler(AddReedSwitchDataCommand)
export class AddReedSwitchDataCommandHandler
  implements ICommandHandler<AddReedSwitchDataCommand, ReedSwitch>
{
  constructor(
    private readonly sensorRepository: ISensorRepository,
    private readonly reedSwitchRepository: IReedSwitchRepository,
  ) {}

  async execute(command: AddReedSwitchDataCommand): Promise<ReedSwitch> {
    const { sensorId, isOpened } = command.input;

    const existingSensor = await this.sensorRepository.findOneById(sensorId);

    if (!existingSensor) {
      throw new CustomRpcException('Sensor with given id does not exist', ErrorCodeEnum.NOT_FOUND);
    }

    const sensor = ReedSwitch.create({
      sensorId,
      isOpened,
    });

    return await this.reedSwitchRepository.add(sensor);
  }
}
