import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common'
import { GroupsService } from './groups.service'
import { CreateGroupDto } from './dto/create-group.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'

@Controller('groups')
@ApiTags('groups')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto)
  }

  @Get()
  findAll() {
    return this.groupsService.findAll()
  }

  @Get(':number')
  findOne(@Param('number') number: string) {
    return this.groupsService.findOne(number)
  }
}
