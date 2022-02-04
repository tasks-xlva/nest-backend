import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'

@Controller('users')
@ApiTags('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get('me')
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
