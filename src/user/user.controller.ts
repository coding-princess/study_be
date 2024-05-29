import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  UseFilters,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { UserResponseDto } from './dtos/user.response.dto';
import {
  EmailRequestDto,
  PasswordRequestDto,
  UserRequestDto,
} from './dtos/user.request.dto';
import { AccessGuard } from 'src/auth/guard/jwt-access.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/interfaces/jwt.payload';

@Controller('user')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AccessGuard)
  async getUsers(@Req() req: Request): Promise<UserResponseDto> {
    const { id } = req.user as JwtPayload;
    return this.userService.findByVal('id', id);
  }

  @Post()
  async addUser(@Body() body: UserRequestDto): Promise<UserResponseDto> {
    return this.userService.addUser(body);
  }

  @Delete()
  deleteUser(@Body() body: EmailRequestDto): Promise<void> {
    return this.userService.deleteUser(body);
  }

  @Get('/find')
  async findByEmail(@Body() body: EmailRequestDto): Promise<UserResponseDto> {
    return this.userService.findByEmail(body.email);
  }

  @Put('/password')
  updatePassword(@Body() body: PasswordRequestDto): Promise<void> {
    return this.userService.updatePassword(body);
  }
}
