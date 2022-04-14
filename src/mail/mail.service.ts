import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IEmailMessage } from 'src/models/IEmailMessage';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService){}

    sendUserConfirmation(message: IEmailMessage){
        return this.mailerService.sendMail({
            to: process.env.EMAIL_TO,
            subject: `Сообщение от клиента <${message.email}>`,
            html: message.message
        })
    }
}
