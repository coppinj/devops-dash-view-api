import { ExtractorService } from '../../services/extractor.service';
import { Pipeline, TestClass } from '../entities';

export abstract class AbstractExtractorService {
  protected constructor(
    private readonly extractor: ExtractorService,
    protected readonly type: string,
  ) {
    this.extractor.registerExtractor(type, this);
  }

  protected abstract _parse(testClass: TestClass): Promise<TestClass>;

  parse(sourceCode: string, pipeline: Pipeline): Promise<TestClass> {
    const testClass = new TestClass();

    testClass.pipeline = pipeline;
    testClass.scaffolding = false;
    testClass.sourceCode = sourceCode;
    testClass.validated = false;

    return this._parse(testClass);
  }
}