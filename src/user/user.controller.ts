import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';

@Controller('user')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserEntity[]> {
    return this.userService.getUsers();
  }

  @Post()
  async addUser(@Body() info) {
    return this.userService.addUser(info);
  }

  @Delete()
  deleteUser(@Body() info) {
    return this.userService.deleteUser(info.email);
  }

  @Get('/find')
  async findByEmail(@Body() info) {
    return this.userService.findByEmail(info.email);
  }

  @Put('/password')
  updatePassword(@Body() info) {
    return this.userService.updatePassword(info.email, info.password);
  }
}
