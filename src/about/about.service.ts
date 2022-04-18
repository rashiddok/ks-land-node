import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { About } from 'src/entities/about.entity';
import { AboutReq } from 'src/models/AboutReq';
import { Repository } from 'typeorm';

@Injectable()
export class AboutService {
    constructor(
        @InjectRepository(About) private aboutRepository: Repository<About>
    ){

    }

    findAllAbout(): Promise<About>{
        return this.aboutRepository.find().then(v=>v.length === 1 ? v[0] : undefined)
    }

    findById(id: number): Promise<About>{
        return this.aboutRepository.findOne({
            where: {
                id: id
            }
        })
    }

    private createAbout(body: AboutReq): Promise<About>{
        const aboutEntity = this.aboutRepository.create(body);
        return this.aboutRepository.save(aboutEntity)
    }

    private async patchAbout(body: AboutReq, id: number){
        return this.aboutRepository.save({
            id: id,
            ...body
        })
    }

    public async manipulateAbout(body: AboutReq){
        const aboutObject = await this.findAllAbout()
        if(aboutObject !== undefined){
            const id = aboutObject.id
            return this.patchAbout(body, id)
        }
        return this.createAbout(body)
    }
    
}
