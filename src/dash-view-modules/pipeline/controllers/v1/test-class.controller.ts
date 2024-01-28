import { MultipartFilesInterceptor, TestClassUploadDTO } from '@dash-view-core';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';

@Controller({ path: 'pipelines/{pipelineID}/test-classes', version: 'v1' })
export class TestClassController {
  constructor() {
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(MultipartFilesInterceptor('files'))
  async upload(@Body() dto: TestClassUploadDTO): Promise<void> {
    console.log(dto);
    console.log('UPLOAD');
  }
}