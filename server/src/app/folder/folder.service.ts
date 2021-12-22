import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import {
  CreateFolderInput,
  ListFolderInput,
  UpdateFolderInput,
} from './folder.inputs';
import { Folder, FolderDocument } from './folder.model';

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<FolderDocument>,
  ) {}
  /*
  create = async (payload: CreateFolderInput): Promise<any> => {
    const newFolder = new this.folderModel(payload);
    return await newFolder.save().catch((e) => {
      throw new Error('Error al intentar guardar:' + e);
    });
  };
*/

  create(payload: CreateFolderInput) {
    const newFolder = new this.folderModel(payload);
    return newFolder.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.folderModel.findById(_id).exec();
  }

  list(filters: ListFolderInput) {
    return this.folderModel.find({ ...filters }).exec();
  }

  update(payload: UpdateFolderInput) {
    return this.folderModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }
}
