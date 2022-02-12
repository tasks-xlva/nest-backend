import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { FastifyRequest, FastifyReply } from 'fastify'
import { Error, QueryError, EmptyResultError, ValidationError } from 'sequelize'

@Catch(QueryError, EmptyResultError, ValidationError, QueryError)
export class SequelizeFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<FastifyRequest>()
    const reply = ctx.getResponse<FastifyReply>()
    const status = 400

    reply.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: `${exception.name}: ${exception.message}`,
    })
  }
}
