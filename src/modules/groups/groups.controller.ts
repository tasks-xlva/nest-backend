import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from 'modules/auth/guards/jwt-auth.guard'

import { CreateGroupDto } from './dto/create-group.dto'
import { GroupsService } from './groups.service'

@Controller(`groups`)
@ApiTags(`groups`)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto)
  }

  @Get(`:number`)
  findOne(@Param(`number`) number: string) {
    return this.groupsService.findOne(number)
  }
}
