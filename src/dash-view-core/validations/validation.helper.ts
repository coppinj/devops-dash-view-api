import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { DTOValidator } from './dto-validator';

export class ValidationHelper {
  static createValidator<TDTO>(dto: TDTO): DTOValidator<TDTO> {
    return new DTOValidator(dto);
  }

  /**
   * Create a custom error with the same schema as class-validator
   */
  static createError<TDTO>(property: keyof TDTO | string, errorMessage: string): ValidationError {
    const error = new ValidationError();

    error.property = property.toString();
    error.constraints = {
      custom: errorMessage,
    };

    return error;
  }

  /**
   * Create an error and push in the array
   */
  static addError<TDTO>(errors: ValidationError[], property: keyof TDTO | string, errorMessage: string): ValidationError[] {
    errors.push(ValidationHelper.createError(property, errorMessage));

    return errors;
  }

  /**
   * Throw a critical error
   */
  static throwCriticalError(error: string): BadRequestException {
    throw new BadRequestException(error);
  }

  /**
   * Check errors, throw HttpException if there is at least one error
   */
  static throwErrors(errors: ValidationError[], httpException = true): HttpException {
    if (errors.length) {
      if (httpException) {
        throw new HttpException({ message: errors }, HttpStatus.BAD_REQUEST);
      }
    }

    return null;
  }
}
