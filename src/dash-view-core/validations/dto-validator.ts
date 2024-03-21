import { ValidationError } from 'class-validator';
import { DateTime } from 'luxon';
import { FindManyOptions, Not, Repository } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { ValidationMessages } from './validation-messages';
import { ValidationHelper } from './validation.helper';

export class DTOValidator<TDTO> {
  private readonly errors: ValidationError[];

  constructor(
    private dto: TDTO,
  ) {
    this.errors = [];
  }

  get length(): number {
    return this.errors.length;
  }

  getErrors(): ValidationError[] {
    return this.errors;
  }

  addError(property: keyof TDTO | string, message: string): DTOValidator<TDTO> {
    ValidationHelper.addError(this.errors, property, message);

    return this;
  }

  checkUnique(property: keyof TDTO, entity: any, customMessage?: string): DTOValidator<TDTO> {
    if (entity !== null && entity !== undefined) {
      ValidationHelper.addError(
        this.errors,
        property,
        (customMessage) ? customMessage : ValidationMessages.UNIQUE,
      );
    }

    return this;
  }

  checkFound(property: keyof TDTO | string, entity: any, customMessage?: string): DTOValidator<TDTO> {
    if (entity === null || entity === undefined) {
      ValidationHelper.addError(
        this.errors,
        property,
        (customMessage) ? customMessage : ValidationMessages.ENTITY_NOT_FOUND,
      );
    }

    return this;
  }

  checkDates(startDateProperty: keyof TDTO, endDateProperty: string, customMessage?: string): DTOValidator<TDTO> {
    if (!this.dto[endDateProperty]) {
      return;
    }

    const startDate = DateTime.fromJSDate(this.dto[startDateProperty] as Date);
    const endDate = DateTime.fromJSDate(this.dto[endDateProperty] as Date);

    if (startDate.toMillis() > endDate.toMillis()) {
      ValidationHelper.addError(
        this.errors,
        startDateProperty,
        (customMessage) ? customMessage : ValidationMessages.DATE_START_GREATER_THAN_END,
      );
    }

    return this;
  }

  async checkLinkedEntity<TEntity>(property: keyof TDTO, service: Repository<TEntity>, required?: boolean, customMessage?: string, options?: FindOptionsWhere<TEntity>): Promise<TEntity> {
    let entity;

    if (this.dto[property]) {
      if (!options) {
        options = {};
      }

      if (!options['id']) {
        options['id'] = this.dto[property];
      }

      entity = await service.findOneBy(options);
    }

    if (required && !entity) {
      ValidationHelper.addError(
        this.errors,
        property.toString(),
        (customMessage) ? customMessage : ValidationMessages.ENTITY_NOT_FOUND,
      );

      return null;
    }

    return entity ?? null;
  }

  async checkUniqueConstraint<TEntity>(property: keyof TDTO, service: Repository<TEntity>, properties: any, id?: number, customMessage?: string, customTransform?: any): Promise<DTOValidator<TDTO>> {
    if (!Array.isArray(properties)) {
      properties = [properties];
    }

    const options: FindManyOptions = { where: {} };

    for (const prop of properties) {
      if (customTransform) {
        options.where[prop] = customTransform(this.dto[prop]);
      }
      else {
        options.where[prop] = this.dto[prop];
      }
    }

    if (id) {
      options.where['id'] = Not(id);
    }

    if ((await service.count(options)) !== 0) {
      ValidationHelper.addError(
        this.errors,
        property,
        (customMessage) ? customMessage : ValidationMessages.USED_VALUE,
      );
    }

    return this;
  }

  validate(httpException = true): DTOValidator<TDTO> {
    ValidationHelper.throwErrors(this.errors, httpException);

    return this;
  }
}
