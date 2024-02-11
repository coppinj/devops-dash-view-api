import { PipelineApiKeyGuard, PipelineCreateDTO, PipelineResponseDTO } from '@dash-view-core';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

@Controller({ path: 'pipelines', version: '1' })
@UseGuards(PipelineApiKeyGuard)
export class PipelineController {
  constructor() {
  }

  @Post()
  async create(@Req() req: any, @Body() dto: PipelineCreateDTO): Promise<PipelineResponseDTO> {
    console.log(req);

    return null;
  }
}