import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { UpdateFolderInput } from 'src/graphql';

import { Folder, FolderDocument } from './folder.model';

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<FolderDocument>,
  ) {}

  create(name: string, owner: string) {
    const newFolder = new this.folderModel({ name: name, owner: owner });
    return newFolder.save();
  }

  list(owner: string) {
    return this.folderModel.find({ owner: owner }).exec();
  }

  update(payload: UpdateFolderInput) {
    return this.folderModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.folderModel.findByIdAndRemove(_id);
  }

  deleteByUserId(uid: string) {
    return this.folderModel.deleteMany({ owner: uid });
  }
}
