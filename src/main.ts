import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { SequelizeFilter } from 'shared/sequelize.filter'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    { cors: { origin: `http://localhost:3000` } },
  )

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalFilters(new SequelizeFilter())

  const config = new DocumentBuilder()
    .setTitle(`Tasks API`)
    .setVersion(`1`)
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(``, app, document, {
    uiConfig: {
      persistAuthorization: true,
      layout: `BaseLayout`,
      displayRequestDuration: true,
    },
  })

  await app.listen(8000)
}
bootstrap().then()
