import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from 'src/Dtos/Task.dto';
@Injectable()
export class TaskService {
  constructor(public taskRepo: TaskRepository) {}

  findAll() {
    return this.taskRepo.findAll();
  }
  async findOne(id: string) {
    return await this.taskRepo.findOne(id);
  }
  create(Task: CreateTaskDto) {
    return this.taskRepo.createTask(Task);
  }
  Delete(id: string) {
    return this.taskRepo.DeleteTask(id);
  }
}
