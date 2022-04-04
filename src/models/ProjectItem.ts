export class ProjectItem{
    title: string;
    shortTitle: string;
    cover: File;

    constructor(title: string, shortTitle: string, file: File) {
        this.title = title;
        this.shortTitle = shortTitle;
        this.cover = file
    }
}