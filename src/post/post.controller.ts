import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { PostEntity } from 'src/entities';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts(): Promise<PostEntity[]> {
    return await this.postService.getPosts();
  }

  @Post()
  async addPost(@Body() info): Promise<PostEntity | void> {
    return await this.postService.addPost(info);
  }

  @Delete()
  async deletePost(@Body() info): Promise<void> {
    return await this.postService.deletePost(info.title);
  }

  @Get('/find')
  async findByTitle(@Body() info): Promise<PostEntity> {
    return await this.postService.findByTitle(info.title);
  }

  @Put('/content')
  async updateContent(@Body() info): Promise<void> {
    return await this.postService.updateContent(
      info.oldTitle,
      info.newTitle,
      info.content,
    );
  }

  @Put('/likes')
  async updateLikes(@Body() info): Promise<void> {
    return await this.postService.updateLikes(info.title, info.likes);
  }
}
