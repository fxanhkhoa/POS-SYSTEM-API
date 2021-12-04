import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration.config';
import { Connection } from 'typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopModule } from './module/shop/shop.module';
import { ProductModule } from './module/product/product.module';
import { InvoiceModule } from './module/invoice/invoice.module';
import { SharedModule } from './shared/shared.module';

const ENV = process.env.NODE_ENV;

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: !ENV ? `.env.development` : `.env.${ENV}`,
			isGlobal: true,
			load: [configuration]
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async () => ({
				type: 'postgres',
				username: process.env.POSTGRES_USERNAME,
				password: process.env.POSTGRES_PASSWORD,
				host: process.env.POSTGRES_HOST,
				port: parseInt(process.env.POSTGRES_PORT),
				database: process.env.POSTGRES_DATABASE,
				entities: ['dist/**/*.entity{.ts,.js}'],
				synchronize: true
			}),
			inject: [ConfigService]
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async () => ({
				uri: process.env.MONGODB_CONNECTION_STRING,
				autoIndex: true
			}),
			inject: [ConfigService]
		}),
		UsersModule,
		AuthModule,
		ShopModule,
		ProductModule,
		InvoiceModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {
	constructor(private connection: Connection) {}
}
