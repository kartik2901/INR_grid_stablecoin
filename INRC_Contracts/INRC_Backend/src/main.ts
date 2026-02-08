import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
	dotenv.config();
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: '*', 
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true, 
		allowedHeaders: 'Content-Type, Accept, Authorization',
	});
	
	await app.listen(8080);
	console.log(`Application is running on: http://localhost:8080`);

	console.log('Routes available:');
	const server = app.getHttpServer();
	const router = server._events.request._router;

	router.stack
		.filter((r) => r.route) 
		.forEach((r) => {
			console.log(`${Object.keys(r.route.methods)[0].toUpperCase()} ${r.route.path}`);
		});
}

bootstrap();
