import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Rank } from 'src/common/rank.enum';
import { UserEntity } from 'src/entities';

export class UserResponseDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(Rank)
  rank: Rank;

  @IsOptional()
  @IsString()
  image?: string;

  @IsDate()
  createdAt: Date;

  constructor(userEntity: UserEntity) {
    this.email = userEntity.email;
    this.name = userEntity.name;
    this.rank = userEntity.rank;
    this.image = userEntity.image;
    this.createdAt = userEntity.createdAt;
  }
}
