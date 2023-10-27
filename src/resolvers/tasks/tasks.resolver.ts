import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskStatus } from '@prisma/client';
import GraphQLJSON from 'graphql-type-json';
import { CreateTaskInput, Task } from 'src/tasks/task.model';
import { TasksService } from '../../tasks/tasks.service';

// Resolver is for Graphql

@Resolver(Task)
export class TasksResolver {
  constructor(private tasksService: TasksService) {}

  @Query(() => [Task], { name: 'tasks' })
  async tasks(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Query(() => GraphQLJSON, { name: 'tasks_by_status' })
  async tasksByStatus(): Promise<any> {
    return this.tasksService.getTasksByGroup();
  }

  @Query(() => Task || undefined, { name: 'task' })
  async task(@Args('id', { type: () => Int }) id: number) {
    const result = await this.tasksService.findOne(id);
    if (result) {
      return result;
    } else {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  @Mutation(() => Task, { name: 'addTask' })
  async addTask(
    @Args('input', { type: () => CreateTaskInput }) input: CreateTaskInput,
  ) {
    return this.tasksService.create(input);
  }

  @Mutation(() => Task, { name: 'updateTask' })
  async updateTask(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => CreateTaskInput }) data: CreateTaskInput,
  ) {
    return this.tasksService.updateTask(id, data);
  }

  @Mutation(() => Task, { name: 'updateTaskStatus' })
  async updateTaskStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status', { type: () => TaskStatus }) status: TaskStatus,
  ) {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Mutation(() => Task, { name: 'deleteTask' })
  async deleteTask(@Args('id', { type: () => Int }) id: number) {
    try {
      const deletedTask = await this.tasksService.delete(id);
      if (deletedTask) {
        return deletedTask;
      }
    } catch (error) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
