import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as firebaseAdmin from 'firebase-admin';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const credential = firebaseAdmin.credential.cert('./google-service.json');
	firebaseAdmin.initializeApp({
		credential
	});
	const config = new DocumentBuilder()
		.setTitle('POS System API')
		.setDescription('The POS System api')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	app.enableCors();
	await app.listen(5000);
}
bootstrap();
