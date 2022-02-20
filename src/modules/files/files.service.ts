import { BadRequestException, Injectable } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { createWriteStream } from 'fs'
import { join } from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'

const pump = promisify(pipeline)

@Injectable()
export class FilesService {
  async create(req: FastifyRequest) {
    if (!req.isMultipart()) {
      throw new BadRequestException(
        `Request mimeType is not multipart/form-data`,
      )
    }

    const { file, filename } = await req.file()
    await pump(file, createWriteStream(join(process.cwd(), `media`, filename)))
  }
}
