import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as RepositoryTypeORM } from 'typeorm';
import { Repository } from '../model';
import { RepositoryCreateDTO, RepositoryReadDTO, RepositoryUpdateDTO } from '../model/dto/repository';
import { AbstractService } from './abstract.service';

@Injectable()
export class RepositoryService extends AbstractService<Repository,
  RepositoryReadDTO,
  any,
  RepositoryCreateDTO,
  RepositoryUpdateDTO> {
  constructor(
    @InjectRepository(Repository)
      repo: RepositoryTypeORM<Repository>,
  ) {
    super(repo);
  }
}
