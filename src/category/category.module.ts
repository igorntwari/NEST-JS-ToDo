import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { categoryRepository } from './category.repository';

@Module({
  controllers: [CategoryController],
  providers: [categoryRepository, CategoryService],
})
export class CategoryModule {}
