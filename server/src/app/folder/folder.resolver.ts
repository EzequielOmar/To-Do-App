import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import {
  CreateFolderInput,
  Folder,
  ListFolderInput,
  Task,
  UpdateFolderInput,
} from 'src/graphql';
import { TaskService } from '../task/task.service';
import { FolderService } from './folder.service';

@Resolver(() => Folder)
export class FolderResolver {
  constructor(private fs: FolderService, private ts: TaskService) {}

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
    await this.ts.deleteByFolderId(_id).then(() => {
      return this.fs.delete(_id);
    });
  }

  @ResolveField('ftasks', () => [Task])
  async ftasks(@Parent() folder: Folder) {
    const { _id } = folder;
    return this.ts.list({ folder: _id });
  }
}
