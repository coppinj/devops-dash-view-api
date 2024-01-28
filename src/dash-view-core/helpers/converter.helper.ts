export class ConverterHelper {
  static toBoolean(value: boolean | string | undefined): boolean {
    switch (typeof value) {
      case 'boolean':
        return value;
      case 'string':
        const truthy: string[] = [
          'true',
          'True',
          '1',
        ];

        return truthy.includes(value);
      default:
        return false;
    }
  }

  static toInt(value: number | string | undefined): number | undefined {
    if (value === undefined) {
      return undefined;
    }

    switch (typeof value) {
      case 'number':
        return value;
      case 'string':
        return parseInt(value, 10);
      default:
        throw new Error('missing case');
    }
  }
}
