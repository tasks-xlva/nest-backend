import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'

@Controller('users')
@ApiTags('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get('me')
  async findMe(@Request() req) {
    const user = await this.usersService.findOne(req.user.email)
    delete user.password
    return user
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
