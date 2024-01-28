import { Controller, Post } from '@nestjs/common';

@Controller({ path: 'pipelines', version: '1' })
export class PipelineController {
  constructor() {
  }

  @Post()
  async create(): Promise<any> {

  }
}