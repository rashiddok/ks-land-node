export class Image{
    file: File;
    cover: File;
    path: string;

    constructor(file: File, cover: File, path: string){
        this.file = file;
        this.cover = cover;
        this.path = path
    }
}