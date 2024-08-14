import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  setupDocs(app);
  const port = +process.env.APP_PORT || 3000;
  await app.listen(port, () => console.log(`Server running on port ${port}`));
}

function setupDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Logística API')
    .setDescription('API para calcular valor e prazo de fretes')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

bootstrap();
