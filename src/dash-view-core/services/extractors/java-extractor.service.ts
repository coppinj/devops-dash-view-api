import { Injectable } from '@nestjs/common';
import { AbstractExtractorService, TestClass } from '../../model';
import { ExtractorService } from '../extractor.service';

@Injectable()
export class JavaExtractorService extends AbstractExtractorService {
  constructor(
    extractor: ExtractorService,
  ) {
    super(extractor, 'java');
  }

  protected async _parse(testClass: TestClass): Promise<TestClass> {
    return testClass;
  }
}