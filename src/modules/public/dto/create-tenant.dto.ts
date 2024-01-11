import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTenantsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  name: string;
}
