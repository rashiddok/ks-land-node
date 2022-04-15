export class ProjectItem{
    id: number;
    title: string;
    shortTitle: string;
    cover: string;

    constructor(id: number,title: string, shortTitle: string, file: string) {
        this.id = id
        this.title = title;
        this.shortTitle = shortTitle;
        this.cover = file
    }
}