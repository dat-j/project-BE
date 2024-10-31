import { Controller, Post, Body, ValidationPipe, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { User } from './user.entity';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/signup')
  signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto.email, signUpDto.password, signUpDto.name);
  }

  @Post('auth/signin')
  signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}