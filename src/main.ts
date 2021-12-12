import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { TypeORMExceptionFilter } from '@/typeorm-exception.filter'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  )

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalFilters(new TypeORMExceptionFilter())

  const config = new DocumentBuilder()
    .setTitle('Tasks API')
    .setVersion('1')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('', app, document, {
    uiConfig: {
      persistAuthorization: true,
      layout: 'BaseLayout',
      displayRequestDuration: true,
    },
  })

  await app.listen(3000)
}
bootstrap().then()
