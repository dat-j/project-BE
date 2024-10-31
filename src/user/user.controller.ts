import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../auth/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/:id')
  getProfile(@Param('id') id: number): Promise<User> {
    return this.userService.getProfile(id);
  }
}