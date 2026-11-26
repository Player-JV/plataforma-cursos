import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Conecta o Consumer do Kafka dentro do mesmo backend NestJS
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'notificacoes-consumer',
      },
    },
  });

  const config = new DocumentBuilder()
    .setTitle('API Plataforma de Cursos')
    .setDescription('Documentação da API com proteção JWT e Kafka')
    .setVersion('1.0')
    .addBearerAuth(
  { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
  'token',
)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();