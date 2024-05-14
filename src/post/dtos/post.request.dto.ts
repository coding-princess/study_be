import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostRequestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  author: number;
}

export class ContentRequestDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}

export class LikesRequestDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  likes: number;
}

export class TitleRequestDto extends PickType(PostRequestDto, [
  'title',
] as const) {}

export class AuthorRequestDto extends PickType(PostRequestDto, [
  'author',
] as const) {}

export class IDRequestDto extends PickType(ContentRequestDto, [
  'id',
] as const) {}
