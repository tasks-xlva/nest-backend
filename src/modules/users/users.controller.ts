import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from 'modules/auth/guards/jwt-auth.guard'

import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller(`users`)
@ApiTags(`users`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(`me`)
  findMe(@Request() req) {
    return this.usersService.findOne(req.user.email)
  }

  // @Get(':email')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.usersService.findOne(+id)
  // }

  // @Patch(':email')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   return this.usersService.update(email, updateUserDto)
  // }

  // @Delete(':email')
  // @HttpCode(204)
  // remove(@Param('email') email: string) {
  //   return this.usersService.remove(email)
  // }
}
