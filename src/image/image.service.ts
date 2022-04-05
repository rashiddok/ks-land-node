import { Injectable} from '@nestjs/common';
import { readdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ImageService {

    constructor(){}

    getFileList(): string[]{
        return readdirSync(join('files/'))
    }
}
