import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable, Req } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO, LoginDTO } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable() //Dependenci injection
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(authDTO: AuthDTO) {
    const hashedPW = await argon.hash(authDTO.password);
    try {
      const newUser = await this.prismaService.user.create({
        data: {
          email: authDTO.email,
          hashedPW,
          firstName: authDTO.firstName,
          lastName: authDTO.lastName,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createAt: true,
        },
      });
      return await this.getJwtToken(newUser.id, newUser.email);
    } catch (error) {
      throw new ForbiddenException('lỗi');
    }
  }

  async login(loginDTO: LoginDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginDTO.email,
      },
    });
    if (!user) {
        throw new ForbiddenException('Tài khoản không tồn tại!');
      }
    const verifyPassword = await argon.verify(user.hashedPW, loginDTO.password);
    if (!verifyPassword) {
      throw new ForbiddenException('Sai mật khẩu!');
    }
    delete user.hashedPW;
    return await this.getJwtToken(user.id, user.email);
  }

  async getJwtToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      id: userId,
      email,
    };
    const jwtToken = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      accessToken: jwtToken,
    };
  }
}
