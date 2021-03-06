import { Controller, Delete, Get, Param, Post, Response, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ImageService } from './image.service';

@UseGuards(JwtAuthGuard)
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

    @Post('replace')
    @UseInterceptors(
        FileFieldsInterceptor([
            {
                name: 'file', maxCount: 1
            },
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
    replaceImage() {
      return { res: 'ok' };
    }

    @Get('filelist')
    getFileList(){
        return this.imageService.getFileList()
    }

    @Delete(':filename')
    deleteFile(@Param('filename') filename: string){
        console.log(filename)
        return this.imageService.deleteImageInstances(filename)
    }

        
}
