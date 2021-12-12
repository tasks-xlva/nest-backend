import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { GroupsService } from './groups.service'
import { CreateGroupDto } from './dto/create-group.dto'
import { ApiConsumes, ApiTags } from '@nestjs/swagger'

@Controller('groups')
@ApiTags('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
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
