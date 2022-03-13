import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { FastifyReply, FastifyRequest } from 'fastify'
import { readFile } from 'fs'
import { join } from 'path'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { FilesService } from './files.service'

@ApiTags(`files`)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller(`files`)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiConsumes(`multipart/form-data`)
  @ApiBody({
    schema: {
      type: `object`,
      properties: {
        file: {
          type: `string`,
          format: `binary`,
        },
      },
    },
  })
  @Post()
  create(@Req() req: FastifyRequest) {
    return this.filesService.create(req)
  }

  @ApiResponse({
    status: 200,
    schema: {
      type: `string`,
      format: `binary`,
    },
  })
  @Get(`:filename`)
  async findOne(@Param(`filename`) filename: string, @Res() res: FastifyReply) {
    readFile(join(process.cwd(), `media`, filename), (err, fileBuffer) =>
      res.send(err || fileBuffer),
    )
  }
}
