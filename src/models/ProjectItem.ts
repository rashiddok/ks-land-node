export class ProjectItem{
    title: string;
    shortTitle: string;
    cover: string;

    constructor(title: string, shortTitle: string, file: string) {
        this.title = title;
        this.shortTitle = shortTitle;
        this.cover = file
    }
}