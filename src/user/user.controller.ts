import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../auth/user.entity';
import { UpdateUserDto } from './update.user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/:id')
  getProfile(@Param('id') id: number): Promise<User> {
    return this.userService.getProfile(id);
  }

  @Put('/edit/:id')
  async editProfile(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.editUserProfile(+id, user);
  }
}
