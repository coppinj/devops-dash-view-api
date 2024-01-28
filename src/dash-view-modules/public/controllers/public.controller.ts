import { ISeedDTO, IVersionDTO } from '@dash-view-common';
import { SeedService } from '@dash-view-core';
import { Controller, Get } from '@nestjs/common';
import { version } from '../../../../package.json';

@Controller('public')
export class PublicController {
  constructor(
    private readonly seedService: SeedService,
  ) {
  }

  @Get('version')
  getVersion(): IVersionDTO {
    return { version } as IVersionDTO;
  }

  @Get('seed')
  async seed(): Promise<ISeedDTO[]> {
    return await this.seedService.seed();
  }
}
