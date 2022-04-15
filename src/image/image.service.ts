import { HttpException, Injectable} from '@nestjs/common';
import { readdirSync, rm, unlink, unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ImageService {

    constructor(){}

    getFileList(): string[]{
        return readdirSync(join('files/'))
    }

    deleteImageInstances(imageName: string){
        const imagePath = join('files/',imageName.replace('_cover',''))
        const imageCoverPath = join('files/',imageName)
        try{
            unlinkSync(imagePath)
            unlinkSync(imageCoverPath)
        } catch(err){
            throw new HttpException('IMAGE NOT FOUND', 400)
        }

        
    }
}
