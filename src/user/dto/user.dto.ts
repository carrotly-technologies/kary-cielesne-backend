import { IsString, MaxLength } from 'class-validator';

export class UserDto {
  @IsString()
  @MaxLength(40)
  name: string;
}
