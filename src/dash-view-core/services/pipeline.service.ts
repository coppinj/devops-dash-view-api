import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as RepositoryTypeORM } from 'typeorm';
import { Pipeline, PipelineResponseDTO, Repository } from '../model';
import { AbstractCRUDService } from './common';
import { RepositoryService } from './repository.service';

@Injectable()
export class PipelineService extends AbstractCRUDService<Pipeline,
  any,
  any> {
  get parentProperty(): keyof Pipeline {
    return 'repository';
  }

  get parentService(): RepositoryService {
    return this.repositoryService;
  }

  constructor(
    @InjectRepository(Pipeline)
      repo: RepositoryTypeORM<Pipeline>,
    private readonly repositoryService: RepositoryService,
  ) {
    super(repo);
  }

  async createFromPipeline(repository: Repository): Promise<PipelineResponseDTO> {
    if (!repository) {
      throw new NotFoundException();
    }

    const pipeline = await this.create({}, repository.id);

    const pipelineFromDB = await this.findOneOrNull(pipeline.id);

    const dto = new PipelineResponseDTO();

    dto.uuid = pipelineFromDB.uuid;

    return dto;
  }

  async findOneByUUIDAndRepositoryID(uuid: string, repositoryID: number): Promise<Pipeline> {
    return this.repo.findOne({
      where: {
        uuid,
        repositoryID,
      },
    });
  }
}
