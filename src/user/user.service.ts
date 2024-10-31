import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async getProfile(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'name', 'email', 'createdAt', 'avatarUrl', 'username'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    return user;
  }

  async editUserDetail(idUser:number, name?: string, userName?: string, avatarUrl?:string, bio?: string, email?: string){
    const query = this.userRepository.createQueryBuilder()
    query.
  }
}
