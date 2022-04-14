import { Body, Controller, Post } from '@nestjs/common';
import { IEmailMessage } from 'src/models/IEmailMessage';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private emailService: MailService) {
        
    }
    @Post('')
    sendMessage(@Body() message: IEmailMessage){
        return this.emailService.sendUserConfirmation(message)
    }
}
