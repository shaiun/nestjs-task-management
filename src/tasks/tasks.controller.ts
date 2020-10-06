import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {Task} from "./task.entity";
import {TaskStatus} from "./task-status.enum";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskService.getTasks(filterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id', ParseIntPipe) id: number,
                     @Body('status') status: TaskStatus): Promise<Task> {
        return this.taskService.updateTaskStatus(id, status);
    }
}
