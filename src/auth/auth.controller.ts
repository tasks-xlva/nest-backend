import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard'
import { LoginDto } from '@/auth/dto/login.dto'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    return this.authService.login(req.user)
  }
}
