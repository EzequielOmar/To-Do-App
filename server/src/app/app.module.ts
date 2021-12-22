import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FolderModule } from './folder/folder.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://todo-api:${process.env.db_pass}@cluster0.3mcnq.mongodb.net/todo-app?retryWrites=true&w=majority`,
    ),
    FolderModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
