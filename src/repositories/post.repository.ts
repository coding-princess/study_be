import { HttpException, Injectable } from '@nestjs/common';
import { PostEntity } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostRequestDto } from 'src/post/dtos/post.request.dto';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async findAll(): Promise<PostEntity[]> {
    const posts = await this.postRepository.find();
    return posts;
  }

  async findByTitle(title: string): Promise<PostEntity[]> {
    const posts = await this.postRepository.find({ where: { title } });
    return posts;
  }

  async findByAuthor(authorId: number): Promise<PostEntity[]> {
    const posts = await this.postRepository.find({
      where: { author: { id: authorId } },
    });
    return posts;
  }

  async existsByID(id: number): Promise<boolean> {
    const post = await this.postRepository.exists({ where: { id } });
    return post;
  }

  async create(info: PostRequestDto): Promise<PostEntity> {
    const post = this.postRepository.create({
      title: info.title,
      content: info.content,
      author: { id: info.author },
    });
    return await this.postRepository.save(post);
  }

  async deleteByID(id: number): Promise<void> {
    if (await this.existsByID(id)) {
      await this.postRepository.delete({ id });
    } else {
      throw new HttpException('post not found', 404);
    }
  }

  async updateContent(
    id: number,
    title: string,
    content: string,
  ): Promise<void> {
    if (await this.existsByID(id)) {
      await this.postRepository.update({ id }, { title, content });
    } else {
      throw new HttpException('post not found', 404);
    }
  }

  async updateLikes(id: number, likes: number): Promise<void> {
    if (await this.existsByID(id)) {
      await this.postRepository.update({ id }, { likes });
    } else {
      throw new HttpException('post not found', 404);
    }
  }
}
