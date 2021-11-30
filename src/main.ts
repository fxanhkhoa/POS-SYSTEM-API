import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as firebaseAdmin from 'firebase-admin';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const credential = firebaseAdmin.credential.cert('./google-service.json');
	firebaseAdmin.initializeApp({
		credential
	});
	app.enableCors();
	await app.listen(5000);
}
bootstrap();
