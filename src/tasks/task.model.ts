// src/task.model.ts
import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Task as TaskModel, TaskStatus } from '@prisma/client';

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});

@ObjectType()
export class Task implements TaskModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => TaskStatus)
  status: TaskStatus;
}

@InputType('CreateTaskInput')
export class CreateTaskInput {
  @Field(() => String)
  title: string;

  @Field(() => TaskStatus, { defaultValue: TaskStatus.New })
  status?: TaskStatus;
}

@InputType('UpdateTaskStatus')
export class UpdateTaskStatus {
  @Field(() => TaskStatus, { defaultValue: TaskStatus.New })
  status?: TaskStatus;
}
