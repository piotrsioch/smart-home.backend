import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mongodb',
    url: process.env.DB_URL || 'mongodb://localhost:27017/sensors',
    synchronize: process.env.SYNCHRONIZE_DB,
    useUnifiedTopology: true,
    entities: [],
}