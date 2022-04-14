import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { MailModule } from './mail/mail.module';
import { AboutModule } from './about/about.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from './image/image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import env from 'configuration/env';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/db.sqlite3',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
      serveRoot: '/public'
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [env]
    }),
    ProjectsModule, MailModule, AboutModule, ImageModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private usersService: UsersService) {}
  async onModuleInit() {
    const default_username = process.env.ADMIN_USERNAME
    if (!(await this.usersService.findOneByUsername(default_username))) {
      console.log('CREATING DEFAULT USER');
      await this.usersService.createDefault();
    }
  }
}
