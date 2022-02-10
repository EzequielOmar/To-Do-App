import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
  private readonly salt: number = 7;

  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  /**
   * Check if the user exists, if it does not, create it, and return it
   * @param gid google id
   * @returns Promise<User> or throw error
   */
  async getOrCreateUser(name: string): Promise<User> {
    try {
      let exists = await this.exists(name);
      if (!exists) {
        const newUser = new this.UserModel({ name: name });
        exists = await newUser.save();
      }
      return exists;
    } catch (err: any) {
      throw err;
    }
  }

  list(gid: string) {
    return this.UserModel.findOne({ name: gid }).exec();
  }

  delete(gid: string) {
    return this.UserModel.deleteOne({ name: gid });
  }

  async exists(gid: string): Promise<User | null> {
    return await this.UserModel.findOne({ name: gid }).exec();
  }
}
