import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { Category } from './category.entities';
@Injectable()
export class categoryRepository {
  private db: any;
  taskRepository: any;
  constructor() {
    this.db = new JsonDB(new Config('jsonDB.json', true, false, '/'));
  }
  async findCategories() {
    try {
      return await this.db.getData('/categories');
    } catch (error) {
      throw new NotFoundException('Error while fetching categories.');
    }
  }
  async createCategory(category: Category) {
    try {
      const id: string = uuidv4();
      const name: string = category.name;
      const newCategory = { id, name, ...category };
      this.db.push(`/categories[]`, newCategory);
      return newCategory;
    } catch (error) {
      throw new NotFoundException(`Error while creating category with .`);
    }
  }
  async deleteCategory(id: string) {
    await this.db.delete(`/categories[${id}]`);
  }
}
