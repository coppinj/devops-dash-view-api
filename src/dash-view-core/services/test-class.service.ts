import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import JSZip from 'jszip';
import { Repository as RepositoryTypeORM } from 'typeorm';
import { Repository, TestClass, TestClassUploadDTO } from '../model';
import { AbstractService } from './common';
import { PipelineService } from './pipeline.service';

@Injectable()
export class TestClassService extends AbstractService<TestClass> {
  constructor(
    @InjectRepository(TestClass)
      repo: RepositoryTypeORM<TestClass>,
    private readonly pipelineService: PipelineService,
  ) {
    super(repo);
  }

  async upload(repository: Repository, pipelineUUID: string, dto: TestClassUploadDTO): Promise<void> {
    if (!repository || !pipelineUUID || !dto) {
      throw new NotFoundException();
    }

    const pipeline = await this.pipelineService.findOneByUUIDAndRepositoryID(pipelineUUID, repository.id);

    if (!pipeline) {
      throw new NotFoundException();
    }

    const zip = new JSZip();
    const content = await zip.loadAsync(dto.files[0].buffer);

    content.forEach((relativePath, file) => {
      console.log(`Found file: ${relativePath}`);

      // Check if it's a file and not a folder
      if (!file.dir) {
        // Extract file content as an example
        file.async('string').then((fileContent) => {
          // console.log(`Content of ${relativePath}:`, fileContent);
          // Perform your processing here
        });
      }
    });
  }
}
