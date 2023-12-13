import { ConflictException, Injectable } from '@nestjs/common';
import { categoryRepository } from './category.repository';
import { Category } from './category.entities';
@Injectable()
export class CategoryService {
  constructor(public categoryRepo: categoryRepository) {}

  findCategory() {
    return this.categoryRepo.findCategories();
  }

  create(Category: Category) {
    return this.categoryRepo.createCategory(Category);
  }

  async deleteCategory(id: string) {
    try {
      await this.categoryRepo.deleteCategory(id);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(
          'Cannot delete category as there are tasks associated with it.',
        );
      }
      throw new ConflictException(
        'Cannot delete category as there are tasks associated with it.',
      );
    }
  }
}
