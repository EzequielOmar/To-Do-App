import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Folder, Task, UpdateFolderInput } from 'src/graphql';
import { jwtGuard } from '../auth/services/jwtGuard.service';
import { CurrentUser } from '../auth/services/jwtStrategy.service';
import { TaskService } from '../task/task.service';
import { FolderService } from './folder.service';

@Resolver(() => Folder)
@UseGuards(jwtGuard)
export class FolderResolver {
  constructor(private fs: FolderService, private ts: TaskService) {}

  @Mutation(() => Folder)
  async createFolder(
    @CurrentUser() user: any,
    @Args('name', { type: () => String }) name: string,
  ) {
    return this.fs.create(name, user.thirdPartyId);
  }

  @Mutation(() => Folder)
  async updateFolder(@Args('payload') payload: UpdateFolderInput) {
    return this.fs.update(payload);
  }

  @Mutation(() => Folder)
  async deleteFolder(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.fs.deleteOne(_id);
  }

  @ResolveField('ftasks', () => [Task])
  async ftasks(@Parent() folder: Folder) {
    const { _id } = folder;
    return this.ts.list(_id);
  }
}
