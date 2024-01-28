import { AbstractExtractorService } from '@dash-view-core';
import { Logger } from '@nestjs/common';

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
}