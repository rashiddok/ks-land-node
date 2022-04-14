import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './guards/jwt.strategy';
import { LocalStrategy } from './guards/local.strategy';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard, JwtAuthGuard],
  controllers: [AuthController],
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRES}s` },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
