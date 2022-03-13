import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from 'modules/auth/guards/jwt-auth.guard'

import { CreateGroupDto } from './dto/create-group.dto'
import { JoinGroupDto } from './dto/join-group.dto'
import { GroupsService } from './groups.service'

@Controller(`groups`)
@ApiTags(`groups`)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto, @Request() req) {
    return this.groupsService.create(createGroupDto, req.user)
  }

  @Get()
  findAll(@Request() req) {
    return this.groupsService.findAll(req.user)
  }

  @Get(`:number`)
  findOne(@Param(`number`) number: string) {
    return this.groupsService.findOne(number)
  }

  @Get(`:number/memberships`)
  findAllMemberships(@Param(`number`) number: string) {
    return this.groupsService.findAllMemberships(number)
  }

  @Post(`join`)
  join(@Body() joinGroupDto: JoinGroupDto, @Request() req) {
    return this.groupsService.join(joinGroupDto, req.user)
  }
}
