import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
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

    @UseGuards(JwtAuthGuard)
    @Put('create')
    createProject(
        @Body() project: Project
    ){
        return this.projectsService.createProject(project)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteProject(@Param('id') id: number){
        return this.projectsService.deleteProject(id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    patchProject(@Param('id') id: string, @Body() project: Project){
        return this.projectsService.editProject(id, project)
    }
}
