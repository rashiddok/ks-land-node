import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AboutReq } from 'src/models/AboutReq';
import { AboutService } from './about.service';

@Controller('about')
export class AboutController {
    constructor(private aboutService: AboutService){}

    @Get('')
    getAbout(){
        return this.aboutService.findAllAbout()
    }


    @UseGuards(JwtAuthGuard)
    @Post('')
    addAbout(@Body() body: AboutReq){
        return this.aboutService.manipulateAbout(body)
    }
}
