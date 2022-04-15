import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { ProjectItem } from 'src/models/ProjectItem';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project) private projectsRepository: Repository<Project>
    ){}

    findProjects(): Promise<ProjectItem[]>{
        return this.projectsRepository.find()
        .then(data=>{
            if(data){
                return data.map(value=>new ProjectItem(value.id,value.title, value.shortTitle, value.cover))
            }
            return []
        })
    }

    findProjectByTitle(shortTitle: string): Promise<Project>{
        return this.projectsRepository.findOne({
            where: {
                shortTitle: shortTitle
            }
        })
    }

    private findProjectById(id: number): Promise<Project>{
        return this.projectsRepository.findOne({
            where: {
                id: id
            }
        })

    }

    createProject(data: Project): Promise<Project>{
        const project = this.projectsRepository.create(data)
        return this.projectsRepository.save(project)
    }

    editProject(id: string, props: Project){
        return this.projectsRepository.save({
            id: id,
            ...props
        })
    }

    deleteProject(id: number){
        return this.findProjectById(id)
        .then(project=>{
            console.log(project)
            this.projectsRepository.remove(project)
        })
    }
}
