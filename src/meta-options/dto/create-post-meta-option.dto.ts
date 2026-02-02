import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostMetaOptionDto {
  @IsNotEmpty()
  @IsJSON()
 metaValue:string
}
