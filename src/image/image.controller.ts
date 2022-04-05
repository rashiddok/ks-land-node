import { Controller, Get, Param, Post, Response, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
    constructor(
        private imageService: ImageService
    ){}

    @Post('upload')
    @UseInterceptors(
        FileFieldsInterceptor([
            {
                name: 'file', maxCount: 1
            },
            {name: 'cover', maxCount: 1}
        ],{
            storage: diskStorage({
                destination(req, file, cb){
                    cb(null,'files')
                },
                filename(req,file,cb){
                    cb(null,file.originalname)
                }
            })
        })
    )
    uploadImage() {
      return { res: 'ok' };
    }

    @Get('filelist')
    getFileList(){
        return this.imageService.getFileList()
    }

        
}
