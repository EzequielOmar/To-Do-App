import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import {
  CreateFolderInput,
  ListFolderInput,
  UpdateFolderInput,
} from 'src/graphql';

import { Folder } from './folder.model';
import { FolderService } from './folder.service';

@Resolver(() => Folder)
export class FolderResolver {
  constructor(private fs: FolderService /*, private ts: TaskService*/) {}

  @Query(() => [Folder])
  async folders(
    @Args('filters', { nullable: true }) filters?: ListFolderInput,
  ) {
    return this.fs.list(filters);
  }
  @Mutation(() => Folder)
  async createFolder(@Args('payload') payload: CreateFolderInput) {
    return this.fs.create(payload);
  }

  @Mutation(() => Folder)
  async updateFolder(@Args('payload') payload: UpdateFolderInput) {
    return this.fs.update(payload);
  }

  @Mutation(() => Folder)
  async deleteFolder(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.fs.delete(_id);
  }

  //@ResolveField('tasks',() => [Task])
  //async tasks(@Parent() folder: Folder) {
  //  const { _id } = folder;
  //  return this.ts.list({ folder });
  //}
}
