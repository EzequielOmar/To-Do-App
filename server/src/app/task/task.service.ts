import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateTaskInput, UpdateTaskInput } from 'src/graphql';
import { Task, TaskDocument } from './task.model';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  create(payload: CreateTaskInput) {
    const newTask = new this.taskModel(payload);
    return newTask.save();
  }

  list(fid: string) {
    return this.taskModel.find({ folder: fid }).exec();
  }

  update(payload: UpdateTaskInput) {
    return this.taskModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.taskModel.findByIdAndRemove(_id);
  }

  deleteByFolderId(fid: MongooseSchema.Types.ObjectId) {
    return this.taskModel.deleteMany({ folder: fid });
  }
}
