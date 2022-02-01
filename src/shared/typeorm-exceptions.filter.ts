import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { FastifyRequest, FastifyReply } from 'fastify'
import { QueryFailedError, EntityNotFoundError, TypeORMError } from 'typeorm'

@Catch(QueryFailedError, EntityNotFoundError)
export class TypeormExceptionsFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<FastifyRequest>()
    const reply = ctx.getResponse<FastifyReply>()
    const status = 400

    reply.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: `[TypeORM] ${exception.message}`,
    })
  }
}
