import { UseGuards } from '@nestjs/common';
import {
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User, Folder } from 'src/graphql';
import { jwtGuard } from '../auth/services/jwtGuard.service';
import { CurrentUser } from '../auth/services/jwtStrategy.service';
import { FolderService } from '../folder/folder.service';
import { UserService } from './user.service';

@Resolver(() => User)
@UseGuards(jwtGuard)
export class UserResolver {
  constructor(private fs: FolderService, private us: UserService) {}

  @Query(() => User)
  async User(@CurrentUser() user: any) {
    return this.us.list(user.thirdPartyId);
  }

  @Mutation(() => User)
  async deleteUser(@CurrentUser() user: any) {
    await this.fs.deleteByUserId(user.thirdPartyId).then(() => {
      return this.us.delete(user.thirdPartyId);
    });
  }

  @ResolveField('ufolders', () => [Folder])
  async ufolders(@Parent() User: User) {
    const { name } = User;
    return this.fs.list(name);
  }
}
