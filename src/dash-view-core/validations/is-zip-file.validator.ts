import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsZipFile(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    registerDecorator({
      name: 'isZipFile',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _: ValidationArguments) {
          if (Array.isArray(value)) {
            return value.length > 0 && value.every(x => x.mimetype === 'application/zip' || /\.zip$/.test(x.originalname));
          }

          return value && (value.mimetype === 'application/zip' || /\.zip$/.test(value.originalname));
        },
        defaultMessage(_: ValidationArguments) {
          return 'File is not a valid ZIP file';
        },
      },
    });
  };
}