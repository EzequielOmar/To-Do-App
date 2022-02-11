import { UseGuards } from '@nestjs/common';
import {
  Args,
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
  async updateUserName(
    @CurrentUser() user: any,
    @Args('name', { type: () => String }) name: string,
  ) {
    return this.us.update(user.thirdPartyId, name);
  }

  @Mutation(() => User)
  async deleteUser(@CurrentUser() user: any) {
    await this.us.delete(user.thirdPartyId).then((r) => r);
  }

  @ResolveField('ufolders', () => [Folder])
  async ufolders(@Parent() User: User) {
    const { provId } = User;
    return this.fs.list(provId);
  }
}
