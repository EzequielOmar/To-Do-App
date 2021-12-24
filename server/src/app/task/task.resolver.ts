import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput, ListTaskInput, UpdateTaskInput } from './task.inputs';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { Schema as MongooseSchema } from 'mongoose';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private ts: TaskService) {}

  @Query(() => [Task])
  async tasks(@Args('filters', { nullable: true }) filters?: ListTaskInput) {
    return this.ts.list(filters);
  }

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
