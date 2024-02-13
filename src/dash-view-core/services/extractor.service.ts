import { Logger } from '@nestjs/common';
import { AbstractExtractorService, Pipeline, TestClass } from '../model';

export class ExtractorService {
  private _logger: Logger;
  private _extractorsMap: Map<string, AbstractExtractorService>;

  constructor() {
    this._extractorsMap = new Map<string, AbstractExtractorService>();
    this._logger = new Logger('Extractor');
  }

  registerExtractor(type: string, extractor: AbstractExtractorService): void {
    if (this._extractorsMap.has(type)) {
      this._logger.error(`Extractor "${type}" is already registered`);
    }
    else {
      this._logger.log(`Extractor "${type}" has been successfully registered`);

      this._extractorsMap.set(type, extractor);
    }
  }

  parse(pipeline: Pipeline, filename: string, content: string): Promise<TestClass> {
    if (filename.indexOf('.') === -1) {
      return null;
    }

    const extension = filename.split('.').pop();

    if (!this._extractorsMap.has(extension)) {
      return null;
    }

    return this._extractorsMap.get(extension)!.parse(pipeline, content);
  }
}