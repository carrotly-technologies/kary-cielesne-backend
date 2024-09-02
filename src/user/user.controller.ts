import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  findAllUsers() {
    return this.userService.findAll();
  }

  @Post('create')
  createUser(@Body() body: UserDto) {
    return this.userService.create({ name: body.name });
  }

  @Post('points/add')
  pointsAdd(@Body() body: UserDto) {
    return this.userService.addPoints(body.name);
  }

  @Post('points/subtract')
  pointsSubtract(@Body() body: UserDto) {
    return this.userService.subtractPoints(body.name);
  }

  @Post('delete')
  delete(@Body() body: UserDto) {
    return this.userService.delete(body.name);
  }
}
