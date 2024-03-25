import { IReadDTO } from '@dash-view-common';
import { AbstractController, IntParam, TestClass, TestClassService } from '@dash-view-core';
import { Controller, Get, Post, Res } from '@nestjs/common';

const contentDisposition = require('content-disposition');

@Controller({ path: 'repositories/:repositoryID/pipelines/:pipelineID/test-classes' })
export class TestClassController extends AbstractController<TestClass> {
  constructor(
    private readonly testClassService: TestClassService,
  ) {
    super(testClassService);
  }

  @Post(':id/toggle-validated')
  async toggleValidated(
    @IntParam('id') id: number,
    @IntParam('pipelineID') pipelineID: number,
    @IntParam('repositoryID') repositoryID: number,
  ): Promise<IReadDTO> {
    return await this.testClassService.toggleValidated(repositoryID, pipelineID, id);
  }

  @Get(':id/download')
  async download(
    @Res() response: any,
    @IntParam('id') id: number,
    @IntParam('pipelineID') pipelineID: number,
    @IntParam('repositoryID') repositoryID: number,
  ): Promise<void> {
    const testClass = await this.testClassService.getOne(repositoryID, pipelineID, id);

    response.header('Content-Disposition', contentDisposition(`${testClass.name}.${testClass.extension}`));
    response.type('text/plain');
    response.send(testClass.sourceCode);
  }
}