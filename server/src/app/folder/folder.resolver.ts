import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import {
  CreateFolderInput,
  ListFolderInput,
  UpdateFolderInput,
} from './folder.inputs';
import { Folder } from './folder.model';
import { FolderService } from './folder.service';

@Resolver(() => Folder)
export class FolderResolver {
  constructor(private fs: FolderService) {}

  @Query(() => Folder)
  async folder(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.fs.getById(_id);
  }

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
}
