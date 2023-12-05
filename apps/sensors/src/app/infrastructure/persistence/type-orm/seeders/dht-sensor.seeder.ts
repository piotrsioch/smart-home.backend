import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DhtSensorEntity } from '../entities/dht-sensor.entity';
import { DhtSensorFactory } from "../factories/dht-sensor.factory";
//
// @Injectable()
// export class DhtSensorSeeder {
//   constructor(
//     @InjectRepository(DhtSensorEntity)
//     private readonly dhtSensorRepository: Repository<DhtSensorEntity>,
//   ) {}
//
//   async onModuleInit() {
//     console.log('Starting seeding');
//     await this.seed();
//   }
//
//   async seed(): Promise<void> {
//     const initialData: any[] = [
//       { temperature: '25', humidity: '50' },
//       { temperature: '23', humidity: '48' },
//     ];
//
//     await Promise.all(
//       initialData.map(async (data) => {
//         const newSensor = this.dhtSensorRepository.create(data);
//         await this.dhtSensorRepository.save(newSensor);
//       }),
//     );
//
//     console.log('Seeding for dht sensor ended.');
//   }
// }

@Injectable()
export class DhtSensorSeeder {
  constructor(
      @InjectRepository(DhtSensorEntity)
      private readonly dhtSensorRepository: Repository<DhtSensorEntity>,
      private readonly dhtSensorFactory: DhtSensorFactory,
  ) {}

  async onModuleInit() {
    console.log('Starting seeding');
    await this.seed();
  }

  async seed(): Promise<void> {
    for (let i = 0; i < 10; i++) {
      const sensor = this.dhtSensorFactory.create();
      await this.dhtSensorRepository.save(sensor);
    }
    console.log('Seeding for dht sensor ended.');
  }
}