import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Users } from 'src/entities/users.entity';
import { compareHash } from 'src/utils/hash';
import { IUserLogin } from 'src/models/UserLogin';

type EncryptedData = Omit<Users, 'password'>

type AccessToken = {access_token: string}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<EncryptedData> {
    const user = await this.usersService.findOneByUsername(username);
    if (user !== undefined) {
      const comparePass = await compareHash(pass, user.password)
      if (comparePass) {
        const { password, ...result } = user;
        return result;
      }
    }
    return undefined;
  }

  async login(user: IUserLogin): Promise<AccessToken> {
    const userData = await this.usersService.findOneByUsername(user.username)
    const payload = {...userData};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
