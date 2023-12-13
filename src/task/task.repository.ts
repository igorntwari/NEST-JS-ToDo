import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatus } from './task.entities';
import { CreateTaskDto } from 'src/Dtos/Task.dto';

@Injectable()
export class TaskRepository {
  private db: JsonDB;

  constructor() {
    this.db = new JsonDB(new Config('jsonDB.json', true, true, '/'));
  }

  async findAll() {
    try {
      return await this.db.getData('/tasks');
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching tasks.');
    }
  }

  async findOne(id: string) {
    try {
      const task = await this.db.find(
        `/tasks`,
        (category) => category.id == id,
      );
      if (!task) {
        throw new NotFoundException(`Task with id ${id} not found.`);
      }
      return task;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error while fetching task.');
    }
  }

  async createTask(Task: CreateTaskDto) {
    try {
      const id: string = uuidv4();
      const category = await this.db.find(
        '/categories',
        (category) => category.id === Task.categoryId,
      );
      if (!category) throw new NotFoundException('Category not found.');

      const newTask = { id, ...Task, status: TaskStatus.OPEN };
      this.db.push(`/tasks[]`, newTask);
      return newTask;
    } catch (er) {
      if (er instanceof HttpException) throw er;
      throw new InternalServerErrorException('Error while creating task.');
    }
  }

  async DeleteTask(id: string) {
    try {
      const position = await this.db.getIndex('/tasks', id);
      if (position == -1) {
        throw new NotFoundException(`Unable to find the task with id ${id}`);
      }
      await this.db.delete(`/tasks[${position}]`);
      return id;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new ServiceUnavailableException(
        'Unable to Delete your task for now.',
      );
    }
  }
}
