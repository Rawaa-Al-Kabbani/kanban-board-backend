import { Injectable } from '@nestjs/common';
import { Prisma, Task, TaskStatus } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTaskInput } from './task.model';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async findOne(id: number): Promise<Task | undefined> {
    const data = this.findAll();
    const result = (await data).find((task) => task.id === id);
    return result;
  }

  async create(data: CreateTaskInput): Promise<Task> {
    return this.prisma.task.create({ data: data });
  }

  async updateTask(id: number, data: CreateTaskInput): Promise<Task> {
    return this.prisma.task.update({
      data: data,
      where: {
        id: id,
      },
    });
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    return this.prisma.task.update({
      data: {
        status: status, // pass the status argument as a field of the data object
      },
      where: {
        id: id,
      },
    });
  }

  async delete(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: {
        id: id,
      },
    });
  }

  async getTasksByGroup(): Promise<{ [status: string]: Task[] }> {
    const data = await this.findAll();
    return data.reduce((acc, task) => {
      if (acc[task.status]) {
        acc[task.status].push(task);
      } else {
        acc[task.status] = [task];
      }
      return acc;
    }, {});
  }
}
