import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePipelineDTO {
  @IsNotEmpty()
  @IsString()
    fr: string;
}
