import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(input: Partial<UserDocument>): Promise<User> {
    return this.userModel.create(input);
  }

  async getByName(name: string): Promise<User | null> {
    return this.userModel.findOne({ name }).exec();
  }

  async findAll(): Promise<User[] | null> {
    return this.userModel.find().exec();
  }

  async subtractPoints(name: string) {
    return this.userModel.updateOne({ name }, { $inc: { points: -1 } });
  }

  async addPoints(name: string) {
    return this.userModel.updateOne({ name }, { $inc: { points: +1 } });
  }

  async delete(name: string) {
    return this.userModel.deleteOne({ name });
  }
}
