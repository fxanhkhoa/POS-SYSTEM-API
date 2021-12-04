import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/module/users/entity/users.entity';
import { UsersModule } from 'src/module/users/users.module';

@Module({
	imports: [
		PassportModule,
		UsersModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async () => ({
				secret: process.env.SECRET,
				signOptions: { expiresIn: `${60 * 60 * 12}s` }
			}),
			inject: [ConfigService]
		}),
		TypeOrmModule.forFeature([Users])
	],
	providers: [AuthService, JwtStrategy, LocalStrategy],
	exports: [AuthService]
})
export class AuthModule {}
