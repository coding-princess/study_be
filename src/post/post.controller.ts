import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  UseFilters,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
  AuthorRequestDto,
  ContentRequestDto,
  IDRequestDto,
  LikesRequestDto,
  PostRequestDto,
  TitleRequestDto,
} from './dtos/post.request.dto';
import { PostResponseDto } from './dtos/post.response.dto';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';

@Controller('post')
@UseFilters(HttpExceptionFilter)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts(): Promise<PostResponseDto[]> {
    return this.postService.getPosts();
  }

  @Post()
  async addPost(@Body() body: PostRequestDto): Promise<PostRequestDto> {
    return this.postService.addPost(body);
  }

  @Delete()
  async deletePost(@Body() body: IDRequestDto): Promise<void> {
    return this.postService.deletePost(body);
  }

  @Get('/title')
  async findByTitle(@Body() body: TitleRequestDto): Promise<PostResponseDto[]> {
    return this.postService.findByTitle(body);
  }

  @Get('/author')
  async findByAuthor(
    @Body() body: AuthorRequestDto,
  ): Promise<PostResponseDto[]> {
    return this.postService.findByAuthor(body);
  }

  @Put('/content')
  async updateContent(@Body() body: ContentRequestDto): Promise<void> {
    return this.postService.updateContent(body);
  }

  @Put('/likes')
  async updateLikes(@Body() body: LikesRequestDto): Promise<void> {
    return this.postService.updateLikes(body);
  }
}
