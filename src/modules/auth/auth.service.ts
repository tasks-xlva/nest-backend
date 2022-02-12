import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'

import { User } from 'modules/users/user.entity'
import { UsersService } from 'modules/users/users.service'

import { TokenDto } from './dto/token.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLocalUser(email: User[`email`], password: User[`password`]) {
    const user = await this.usersService.findOne(email)
    if (user && (await compare(password, user.password))) {
      delete user.password
      return user
    }
    return null
  }

  async validateJWTUser(email: User[`email`]) {
    const user = await this.usersService.findOne(email)
    if (user) {
      delete user.password
      return user
    }
    return null
  }

  getToken(user: User): TokenDto {
    return {
      access: this.jwtService.sign(
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        {
          secret: process.env.JWT_SECRET_KEY,
        },
      ),
    }
  }
}
