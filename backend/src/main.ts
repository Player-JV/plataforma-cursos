import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Ativa o CORS: Permite que o teu frontend (React) consiga fazer pedidos a este backend
  app.enableCors();

  // 2. Configuração do Swagger (Documentação e testes da API)
  const config = new DocumentBuilder()
    .setTitle('API Plataforma de Cursos')
    .setDescription('Documentação da API com proteção JWT')
    .setVersion('1.0')
    .addBearerAuth() // Garante que o botão "Authorize" continua a aparecer no Swagger
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  
  // Define que o Swagger vai abrir na rota /api
  SwaggerModule.setup('api', app, document);

  // 3. Inicia o servidor na porta 3000
  await app.listen(3000);
}
bootstrap();