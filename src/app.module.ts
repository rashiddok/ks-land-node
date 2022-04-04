import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { MailModule } from './mail/mail.module';
import { AboutModule } from './about/about.module';

@Module({
  imports: [ProjectsModule, MailModule, AboutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
