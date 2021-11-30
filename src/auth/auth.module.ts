import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async () => ({
				secret: process.env.SECRET,
				signOptions: { expiresIn: `${60 * 60 * 12}s` }
			}),
			inject: [ConfigService]
		})
	],
	providers: [JwtStrategy]
})
export class AuthModule {}