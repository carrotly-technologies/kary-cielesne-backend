import { BadRequestException, Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(input: Partial<UserDocument>) {
    if (await this.repository.getByName(input.name)) {
      throw new BadRequestException('User already exists');
    }
    await this.repository.create(input);
    return this.parseUser(input.name);
  }

  async getByName(name: string): Promise<User> {
    const user = await this.repository.getByName(name);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async findAll() {
    const users = await this.repository.findAll();
    return users.map((user) => {
      return { name: user.name, points: user.points };
    });
  }

  async parseUser(name: string) {
    const user = await this.getByName(name);
    return { name: user.name, points: user.points };
  }

  async addPoints(name: string) {
    await this.getByName(name);
    await this.repository.addPoints(name);
    return this.parseUser(name);
  }

  async subtractPoints(name: string) {
    await this.getByName(name);
    await this.repository.subtractPoints(name);
    return this.parseUser(name);
  }

  async delete(name: string) {
    await this.getByName(name);
    await this.repository.delete(name);
    return { message: `User ${name} deleted` };
  }
}
