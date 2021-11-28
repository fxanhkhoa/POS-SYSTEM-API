import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
	type: 'postgres',
    username: 'postgres',
    password: 'postgres',
	host: 'localhost',
	port: 5432,
	database: 'possystem',
	entities: ['dist/**/*.entity{.ts,.js}'],
	synchronize: true
};
