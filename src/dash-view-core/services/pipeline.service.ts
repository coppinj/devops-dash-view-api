import { IEntityDTO } from '@dash-view-common';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as RepositoryTypeORM } from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import {
  Pipeline,
  PipelineListDTO,
  PipelineReadDTO,
  PipelineResponseDTO,
  Repository,
  TestClass,
  TestClassReadDTO,
} from '../model';
import { AbstractCRUDService } from './common';
import { RepositoryService } from './repository.service';

@Injectable()
export class PipelineService extends AbstractCRUDService<Pipeline,
  PipelineReadDTO,
  PipelineListDTO> {
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
    @InjectRepository(TestClass)
    private readonly testClassRepository: RepositoryTypeORM<TestClass>,
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

  async completeFromPipeline(repository: Repository, uuid: string): Promise<IEntityDTO> {
    if (!repository) {
      throw new NotFoundException();
    }

    if (!uuid) {
      throw new BadRequestException();
    }

    const pipeline = await this.findOneByUUIDAndRepositoryID(uuid, repository.id);

    if (!pipeline) {
      throw new NotFoundException();
    }

    pipeline.completeDate = new Date();

    await this.repo.save(pipeline);

    return pipeline.toIEntityDTO();
  }

  async findOneByUUIDAndRepositoryID(uuid: string, repositoryID: number): Promise<Pipeline> {
    return this.repo.findOne({
      where: {
        uuid,
        repositoryID,
      },
    });
  }

  protected _getListQuery(): FindManyOptions<Pipeline> {
    return {
      order: {
        id: 'ASC',
      },
    };
  }

  protected async _getListDTO(entity: Pipeline): Promise<PipelineListDTO> {
    const dto = new PipelineListDTO();

    dto.completeDate = entity.completeDate;
    dto.count = await this.testClassRepository.count({
      where: {
        pipelineID: entity.id,
      },
    });
    dto.startDate = entity.createdAt;

    return dto;
  }

  protected async _getReadDTO(entity: Pipeline): Promise<PipelineReadDTO> {
    const dto = new PipelineReadDTO();

    dto.id = entity.id;
    dto.completeDate = entity.completeDate;
    dto.startDate = entity.createdAt;

    dto.testClasses = [];

    const testClasses = await this.testClassRepository.find({
      where: {
        pipelineID: entity.id,
      },
      order: {
        id: 'ASC',
      },
      // relations: {
      //   testMethods: true,
      // },
    });

    for (const testClass of testClasses) {
      const item = new TestClassReadDTO();

      item.id = testClass.id;
      item.name = testClass.name;
      item.sourceCode = testClass.sourceCode;
      item.validated = testClass.validated;

      item.methods = [];

      // for (const method of testClass.testMethods) {
      //   const subItem = new TestMethodReadDTO();
      //
      //   subItem.id = method.id;
      //   subItem.row = method.row;
      //   subItem.rows = method.rows;
      //   subItem.validated = method.validated;
      //
      //   item.methods.push(subItem);
      // }

      dto.testClasses.push(item);
    }

    return dto;
  }
}
