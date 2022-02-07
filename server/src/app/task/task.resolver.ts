import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateTaskInput, UpdateTaskInput } from 'src/graphql';
import { UseGuards } from '@nestjs/common';
import { jwtGuard } from '../auth/services/jwtGuard.service';

@Resolver(() => Task)
@UseGuards(jwtGuard)
export class TaskResolver {
  constructor(private ts: TaskService) {}

  @Mutation(() => Task)
  async createTask(@Args('payload') payload: CreateTaskInput) {
    return this.ts.create(payload);
  }

  @Mutation(() => Task)
  async updateTask(@Args('payload') payload: UpdateTaskInput) {
    return this.ts.update(payload);
  }

  @Mutation(() => Task)
  async deleteTask(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.ts.delete(_id);
  }
}
