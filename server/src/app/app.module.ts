import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { FolderModule } from './folder/folder.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://todo-api:${process.env.db_pass}@cluster0.3mcnq.mongodb.net/todo-app?retryWrites=true&w=majority`,
    ),
    FolderModule,
    TaskModule,
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
})
export class AppModule {}
