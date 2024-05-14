import { Injectable } from '@nestjs/common';
import { PostEntity, UserEntity } from 'src/entities';
import { PostRepository } from 'src/repositories/post.repository';
import { PostResponseDto } from './dtos/post.response.dto';
import {
  AuthorRequestDto,
  ContentRequestDto,
  IDRequestDto,
  LikesRequestDto,
  PostRequestDto,
  TitleRequestDto,
} from './dtos/post.request.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getPosts(): Promise<PostResponseDto[]> {
    const postsEntity = await this.postRepository.findAll();
    const posts = postsEntity.map((post) => new PostResponseDto(post));
    return posts;
  }

  async findByTitle(body: TitleRequestDto): Promise<PostResponseDto[]> {
    const postsEntity = await this.postRepository.findByTitle(body.title);
    const posts = postsEntity.map((post) => new PostResponseDto(post));
    return posts;
  }

  async findByAuthor(body: AuthorRequestDto): Promise<PostResponseDto[]> {
    const postsEntity = await this.postRepository.findByAuthor(body.author);
    const posts = postsEntity.map((post) => new PostResponseDto(post));
    return posts;
  }

  async addPost(body: PostRequestDto): Promise<PostResponseDto> {
    const newPostEntity = await this.postRepository.create(body);
    const newPost = new PostResponseDto(newPostEntity);
    return newPost;
  }

  async deletePost(body: IDRequestDto): Promise<void> {
    await this.postRepository.deleteByID(body.id);
  }

  async updateContent(body: ContentRequestDto): Promise<void> {
    await this.postRepository.updateContent(body.id, body.title, body.content);
  }

  async updateLikes(body: LikesRequestDto): Promise<void> {
    await this.postRepository.updateLikes(body.id, body.likes);
  }
}
