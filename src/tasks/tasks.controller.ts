import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { createTaskDto } from './dto/create-task.dto';
import { getTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipes } from './pipes/task-status-validation.pipes';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService : TasksService) {}

    @Get()
    getTasks (@Query(ValidationPipe) filterDto : getTaskFilterDto, @Req() req) : Promise<Task[]> {
        return this.taskService.getTasks(filterDto,req.user);
    }

    @Get('/:id')
    getTaskById(@Param('id' , ParseIntPipe) id:number , @Req() req) : Promise<Task>{
        return this.taskService.getTaskById(id,req.user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask (@Body() createTaskDto:createTaskDto , @Req() req ) : Promise<Task> {
        return this.taskService.createTask(createTaskDto,req.user);
    }

    @Delete('/:id')
    deleteTask(@Param('id' , ParseIntPipe) id:number ,@Req() req) : Promise<void> {
        return this.taskService.deleteTask(id,req.user);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id' , ParseIntPipe) id : number,
        @Body('status' , TaskStatusValidationPipes) status : TaskStatus ,
        @Req() req
    ) : Promise<Task>
    {
        return this.taskService.updateTaskStatus(id,status,req.user);
    }
}
