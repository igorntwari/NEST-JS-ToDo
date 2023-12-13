import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from 'src/Dtos/Task.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(public TaskServices: TaskService) {}
  @Get()
  @ApiResponse({
    status: 200,
    description:
      'here you will see all the tasks that you have created with their generated ids',
  })
  listTasks() {
    return this.TaskServices.findAll();
  }
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'here you will get a single task with its full informatiion',
  })
  singleTask(@Param('id') id: string) {
    return this.TaskServices.findOne(id);
  }
  @Post()
  @ApiResponse({
    status: 200,
    description:
      'here you must see the task yo have created with its generated id.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateTaskDto,
    description: 'Json structure for user object',
  })
  createTask(@Body() task: CreateTaskDto) {
    return this.TaskServices.create(task);
  }
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description:
      'after deleting the task you will see the id of the deleted task',
  })
  DeleteTask(@Param('id') id: string) {
    return this.TaskServices.Delete(id);
  }
}
