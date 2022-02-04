import { Injectable } from '@nestjs/common'
import { UsersService } from '@/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '@/users/entities/user.entity'
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: User['email'], password: User['password']) {
    const user = await this.usersService.findOne(email)
    if (user && (await compare(password, user.password))) {
      delete user.password
      return user
    }
    return null
  }

  async login(user: User) {
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
