import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID } from 'class-validator';
import { TaskStatus } from 'src/task/task.entities';

export class CreateTaskDto {
  @ApiProperty({
    example: '52c95eb1-0188-40a9-b1a8-70e36abf122d',
    required: true,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'todo activity',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'cleaning  rooms',
    required: true,
  })
  @IsString()
  status: TaskStatus;

  @ApiProperty({
    example: 'i have to clean the room before the sun set',
    required: true,
  })
  @IsString()
  description: string;
  @IsUUID()
  categoryId: string;
}
