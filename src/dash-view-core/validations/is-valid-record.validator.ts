import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsValidRecord(validationOptions?: ValidationOptions) {
  return function(object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isValidRecord',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: Record<string, number[]>, _args: ValidationArguments) {
          if (!value || typeof value !== 'object') {
            return false;
          }

          for (const key in value) {
            if (!value[key] || !Array.isArray(value[key]) || !value[key].every((num) => typeof num === 'number')) {
              return false;
            }
          }

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid Record<string, number[]>`;
        },
      },
    });
  };
}