import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async getPosts(): Promise<PostEntity[]> {
    const posts = await this.postRepository.find();
    return posts;
  }

  async findByTitle(title: string): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ where: { title } });
    return post;
  }

  async addPost(info: PostEntity): Promise<PostEntity | void> {
    if (!(await this.findByTitle(info.title))) {
      return await this.postRepository.save(info);
    } else {
      throw new HttpException('post already exists', 409);
    }
  }

  async deletePost(title: string): Promise<void> {
    if (await this.findByTitle(title)) {
      await this.postRepository.delete({ title });
    } else {
      throw new HttpException('post not found', 404);
    }
  }

  async updateContent(
    oldTitle: string,
    newTitle: string,
    content: string,
  ): Promise<void> {
    if (await this.findByTitle(oldTitle)) {
      await this.postRepository.update(
        { title: oldTitle },
        { title: newTitle, content },
      );
    } else {
      throw new HttpException('post not found', 404);
    }
  }

  async updateLikes(title: string, likes: number): Promise<void> {
    if (await this.findByTitle(title)) {
      await this.postRepository.update({ title }, { likes });
    } else {
      throw new HttpException('post not found', 404);
    }
  }
}
