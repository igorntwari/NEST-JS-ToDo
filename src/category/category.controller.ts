import { Controller, Body, Get, Post, Delete, Param } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Category } from './category.entities';
@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(public categoryService: CategoryService) {}
  @Get()
  @ApiResponse({
    status: 200,
    description: 'must see all the list of categories with names and ids',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  listCategorie() {
    return this.categoryService.findCategory();
  }
  @Post()
  @ApiBody({
    type: Category,
    description: 'Json structure for Category object',
  })
  createCategory(@Body() category: Category) {
    return this.categoryService.create(category);
  }
  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
