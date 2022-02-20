import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from 'modules/auth/guards/jwt-auth.guard'

import { UpdateMembershipDto } from './dto/update-membership.dto'
import { MembershipsService } from './memberships.service'

@ApiTags(`memberships`)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller(`memberships`)
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Get(`:id`)
  findOne(@Param(`id`, ParseIntPipe) id: number) {
    return this.membershipsService.findOne(+id)
  }

  @Patch(`:id`)
  update(
    @Param(`id`, ParseIntPipe) id: number,
    @Body() updateMembershipDto: UpdateMembershipDto,
  ) {
    return this.membershipsService.update(+id, updateMembershipDto)
  }

  @Delete(`:id`)
  @HttpCode(204)
  remove(@Param(`id`, ParseIntPipe) id: number) {
    return this.membershipsService.remove(+id)
  }
}
