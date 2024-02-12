import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsZipFile } from '../../../validations';

export class TestClassUploadDTO {
  @IsNotEmpty()
  @IsZipFile()
  @ApiProperty({ type: 'string', format: 'binary' })
    files: Buffer[];
}