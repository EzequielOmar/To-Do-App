import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from './folder.model';
import { FolderService } from './folder.service';
import { FolderResolver } from './folder.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }]),
  ],
  providers: [FolderService, FolderResolver],
})
export class FolderModule {}
