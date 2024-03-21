import Parser from 'tree-sitter';
import { ExtractorService } from '../../services';
import { Pipeline, TestClass } from '../entities';

export abstract class AbstractExtractorService {
  protected _parser: Parser;

  protected constructor(
    private readonly extractor: ExtractorService,
    protected readonly type: string,
  ) {
    this.extractor.registerExtractor(type, this);

    this._parser = new Parser();
    this._setLanguage();
  }

  parse(pipeline: Pipeline, sourceCode: string): Promise<TestClass> {
    const testClass = new TestClass();

    testClass.pipeline = pipeline;
    testClass.sourceCode = sourceCode;
    testClass.validated = false;

    return this._parse(testClass);
  }

  protected abstract _setLanguage(): void;

  protected abstract _parse(testClass: TestClass): Promise<TestClass>;
}