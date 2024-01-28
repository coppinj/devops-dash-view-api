import { AbstractController, Repository, RepositoryService } from '@dash-view-core';
import { Controller } from '@nestjs/common';
import {
  RepositoryCreateDTO,
  RepositoryReadDTO,
  RepositoryUpdateDTO,
} from '../../../dash-view-core/model/dto/repository';

@Controller({ path: 'repositories' })
export class RepositoryController extends AbstractController<Repository,
  RepositoryReadDTO,
  any,
  RepositoryCreateDTO,
  RepositoryUpdateDTO> {
  constructor(
    service: RepositoryService,
  ) {
    super(service);
  }
}