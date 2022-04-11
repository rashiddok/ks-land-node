import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { IUserLogin } from 'src/models/UserLogin';
import { generateHash } from 'src/utils/hash';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private configService: ConfigService
  ) {}


  async findOneByUsername(username: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async addOne(userReq: IUserLogin): Promise<Users>{
    const hash = await generateHash(userReq.password)
    const user: IUserLogin = {
      username: userReq.username,
      password: hash,
    }
    const newUser = this.usersRepository.create(user);
    return this.usersRepository
    .save(newUser);
  }

  createDefault(): Promise<Users> {
    const default_username = this.configService.get('ADMIN_USERNAME')
    const default_password = this.configService.get('ADMIN_PASSWORD')
    const defaultUser: IUserLogin = {
      username: default_username,
      password: default_password,
    }
    return this.addOne(defaultUser)
  }
}
