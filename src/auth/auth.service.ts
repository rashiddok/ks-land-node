import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Users } from 'src/entities/users.entity';
import { compareHash } from 'src/utils/hash';
import { IUserLogin } from 'src/models/UserLogin';

type EncryptedData = Omit<Users, 'password'>;

type AccessToken = {
  access_token: string;
  refresh_token: string;
  expires: string;
};

type Tokens = Omit<AccessToken, 'expires'>;
type RefreshToken = Omit<AccessToken, 'refreshToken'>;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<EncryptedData> {
    const user = await this.usersService.findOneByUsername(username);
    if (user !== undefined) {
      const comparePass = await compareHash(pass, user.password);
      if (comparePass) {
        const { password, ...result } = user;
        return result;
      }
    }
    return undefined;
  }

  async login(user: IUserLogin | Users): Promise<AccessToken> {
    const userData = await this.usersService.findOneByUsername(user.username);
    const payload = { ...userData };
    const access_token = this.jwtService.sign(payload);
    const expires = Date.now() + process.env.JWT_EXPIRES;
    const refreshExpires = Date.now() + +process.env.REFRESH_EXPIRES
    const refresh_token = this.jwtService.sign({ access_token, expires: refreshExpires });
    return {
      access_token,
      refresh_token,
      expires,
    };
  }

  async refreshToken(tokens: Tokens): Promise<AccessToken> {
    const refreshToken: RefreshToken = this.jwtService.decode(
      tokens.refresh_token,
    ) as RefreshToken;
    // if(+refreshToken.expires < Date.now()){
    //   throw new HttpException('REFRESH TOKEN EXPIRED', 400);
    // }
    if (tokens.access_token !== refreshToken.access_token) {
      console.log(tokens.access_token)
      console.log(refreshToken.access_token)
      throw new HttpException('INVALID REFRESH TOKEN', 400);
    }
    const accessTokenData = this.jwtService.decode(
      tokens.access_token,
    ) as Users;
    return this.login(accessTokenData);
  }
}
