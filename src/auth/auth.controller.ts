import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, LoginDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() body: AuthDTO) {
    return this.authService.signup(body);
  }
  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.authService.login(body)
  }
  @Post('forgot')
  forgot() {}
}
