import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '@/users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from '@/auth/strategies/jwt.strategy'
import { LocalStrategy } from '@/auth/strategies/local.strategy'
import { UsersService } from '@/users/users.service'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({ signOptions: { expiresIn: '90d' } }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
  exports: [AuthService]
})
export class AuthModule {}
