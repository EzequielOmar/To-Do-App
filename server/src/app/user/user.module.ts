import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FolderModule } from '../folder/folder.module';
import { User, UserSchema } from './user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    FolderModule,
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
