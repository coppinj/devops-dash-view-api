import { MultipartFilesInterceptor, PipelineApiKeyGuard, TestClassService, TestClassUploadDTO } from '@dash-view-core';
import { Body, Controller, Param, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiSecurity } from '@nestjs/swagger';

@Controller({ path: 'pipelines/:pipelineUUID/test-classes', version: '1' })
@UseGuards(PipelineApiKeyGuard)
@ApiSecurity('Api-Key')
export class TestClassController {
  constructor(
    private readonly testClassService: TestClassService,
  ) {
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(MultipartFilesInterceptor('files'))
  async upload(@Req() req: any, @Param('pipelineUUID') pipelineUUID: string, @Body() dto: TestClassUploadDTO): Promise<void> {
    return this.testClassService.upload(req.repository, pipelineUUID, dto);
  }
}