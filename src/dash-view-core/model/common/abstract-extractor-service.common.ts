import { ExtractorService } from '../../services';
import { Pipeline, TestClass } from '../entities';

import Parser from 'tree-sitter';

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

  protected abstract _setLanguage(): void;
  protected abstract _parse(testClass: TestClass): Promise<TestClass>;

  parse(pipeline: Pipeline, sourceCode: string): Promise<TestClass> {
    const testClass = new TestClass();

    testClass.pipeline = pipeline;
    testClass.scaffolding = false;
    testClass.sourceCode = sourceCode;
    testClass.validated = false;

    return this._parse(testClass);
  }
}