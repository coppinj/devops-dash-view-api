import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as RepositoryTypeORM } from 'typeorm';
import { TestMethod } from '../model';
import { AbstractService } from './common';

@Injectable()
export class TestMethodService extends AbstractService<TestMethod> {
  constructor(
    @InjectRepository(TestMethod)
      repo: RepositoryTypeORM<TestMethod>,
  ) {
    super(repo);
  }
}
