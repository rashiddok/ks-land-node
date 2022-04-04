import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Project } from 'src/entities/project.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {

    constructor(
        private projectsService: ProjectsService
    ){}

    @Get('')
    getProjects(){
        return this.projectsService.findProjects()
    }

    @Get(':title')
    getProjectByTitle(@Param('title') title: string){
        return this.projectsService.findProjectByTitle(title)
    }

    @Put('create')
    createProject(
        @Body() project: Project
    ){
        return this.projectsService.createProject(project)
    }

    @Patch(':id')
    patchProject(@Param('id') id: string, @Body() project: Project){
        return this.projectsService.editProject(id, project)
    }
}
