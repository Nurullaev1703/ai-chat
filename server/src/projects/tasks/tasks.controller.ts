import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService){}
    @Post()
    create(@Body() createTaskDto: CreateTaskDto){
        return this.tasksService.create(createTaskDto)
    }
    @Get()
    findAll(@Query() filters:GetTasksFilterDto){
        return this.tasksService.findAll(filters)
    }
    @Patch(':id')
    update(@Param('id') id:string, @Body() updateTaskdto: UpdateTaskDto){
        return this.tasksService.update(id, updateTaskdto)
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.tasksService.remove(id)
    }
}
