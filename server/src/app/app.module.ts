import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { FolderModule } from './folder/folder.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://todo-api:${process.env.db_pass}@cluster0.3mcnq.mongodb.net/todo-app?retryWrites=true&w=majority`,
    ),
    UserModule,
    FolderModule,
    TaskModule,
    AuthModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      playground: true,
      debug: false,
    }),
  ],
  providers: [],
})
export class AppModule {}
