import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { UpdateFolderInput } from 'src/graphql';
import { TaskService } from '../task/task.service';

import { Folder, FolderDocument } from './folder.model';

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<FolderDocument>,
    private ts: TaskService,
  ) {}

  create(name: string, owner: string) {
    const newFolder = new this.folderModel({ name: name, owner: owner });
    return newFolder.save();
  }

  list(provId: string) {
    return this.folderModel.find({ owner: provId }).exec();
  }

  update(payload: UpdateFolderInput) {
    return this.folderModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  async deleteOne(_id: MongooseSchema.Types.ObjectId) {
    return await this.ts
      .deleteByFolderId(_id)
      .then(() => this.folderModel.findByIdAndRemove(_id));
  }

  async deleteByUserId(uid: string) {
    //get all the user folders
    const userFolders = await this.list(uid);
    //put all the delete folder promises in une array
    const deleteFoldersPromises = userFolders.map((f) => this.deleteOne(f._id));
    //return the array of promises in execution
    return await Promise.all(deleteFoldersPromises);
  }
}
