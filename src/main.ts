import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:8081',
    credentials: true, // Si usas cookies o autenticación
  });
    // 🔧 Configuración de Swagger
    const config = new DocumentBuilder()
    .setTitle('API de mi proyecto')
    .setDescription('Documentación de la API con Swagger')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // UI en /api

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
