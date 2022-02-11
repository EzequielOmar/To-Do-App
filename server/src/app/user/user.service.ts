import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FolderService } from '../folder/folder.service';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
  private readonly salt: number = 7;

  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private fs: FolderService,
  ) {}

  /**
   * Check if the user exists, if it does not, create it, and return it
   * @param provId google id
   * @returns Promise<User> or throw error
   */
  async getOrCreateUser(provId: string, name: string): Promise<User> {
    try {
      let exists = await this.exists(provId);
      if (!exists) {
        const newUser = new this.UserModel({ provId: provId, name: name });
        exists = await newUser.save();
      }
      return exists;
    } catch (err: any) {
      throw err;
    }
  }

  update(provId: string, name: string) {
    return this.UserModel.findOneAndUpdate({ provId: provId }, { name: name });
  }

  list(provId: string) {
    return this.UserModel.findOne({ provId: provId }).exec();
  }

  async delete(provId: string) {
    //wait for all the folders (with the respective task) to delete
    await this.fs.deleteByUserId(provId);
    //then return the delete user mutation
    return this.UserModel.deleteOne({ provId: provId });
  }

  async exists(provId: string): Promise<User | null> {
    return await this.UserModel.findOne({ provId: provId }).exec();
  }
}
