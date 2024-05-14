import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostEntity } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from 'src/repositories/post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
