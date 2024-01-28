import { ISeedDTO } from '@dash-view-common';
import { Injectable } from '@nestjs/common';
import { RoleSeedService } from './role-seed.service';
import { UserSeedService } from './user-seed.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly roleSeedService: RoleSeedService,
    private readonly userSeedService: UserSeedService,
  ) {
  }

  async seed(): Promise<ISeedDTO[]> {
    const results: ISeedDTO[] = [];

    results.push(await this.roleSeedService.seed());
    results.push(await this.userSeedService.seed());

    return results;
  }
}
