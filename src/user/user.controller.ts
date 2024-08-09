import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
    
    @UseGuards(JwtGuard)
    @Get('me')
    me(@GetUser() user: User){
        return user
    }

}
