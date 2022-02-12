import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller(`auth`)
@ApiTags(`auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post(`login`)
  async login(@Request() req) {
    return this.authService.getToken(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Post(`refresh`)
  async refresh(@Request() req) {
    return this.authService.getToken(req.user)
  }
}
