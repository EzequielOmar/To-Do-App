import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FolderModule } from './folder/folder.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://todo-api:todo-api@cluster0.3mcnq.mongodb.net/todo-app?retryWrites=true&w=majority`,
    ),
    FolderModule,
    // TaskModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
