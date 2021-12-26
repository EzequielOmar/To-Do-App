import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from './folder.model';
import { FolderService } from './folder.service';
import { FolderResolver } from './folder.resolver';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }]),
    TaskModule,
  ],
  providers: [FolderService, FolderResolver],
  exports: [FolderService],
})
export class FolderModule {}
