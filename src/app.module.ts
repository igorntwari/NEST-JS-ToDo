import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TaskModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
