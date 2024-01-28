/**
 * Contain the common validation messages
 */
export const ValidationMessages = {
  INVALID: 'INVALID',
  INVALID_EMAIL_PASSWORD: 'INVALID_EMAIL_PASSWORD',
  IS_NUMBER: 'IS_NUMBER',
  REQUIRED: 'REQUIRED',
  NATIONAL_NUMBER: 'NATIONAL_NUMBER',
  IBAN: 'IBAN',
  DATE: 'DATE',
  MIN_DATE: 'MIN_DATE',
  MAX_DATE: 'MAX_DATE',
  NB_YEARS: 'NB_YEARS',
  TIME: 'TIME',
  DATE_START_GREATER_THAN_END: 'DATE_START_GREATER_THAN_END',
  DATE_END_LOWER_THAN_START: 'DATE_END_LOWER_THAN_START',
  PERSON_NOT_CASE: 'PERSON_NOT_CASE',
  IS_ID: 'IS_ID',
  UNIQUE: 'UNIQUE',
  ENTITY_NOT_FOUND: 'ENTITY_NOT_FOUND',
  PARAM_NOT_FOUND: 'PARAM_NOT_FOUND',
  IMAGE_INVALID: 'IMAGE_INVALID',
  USED_VALUE: 'USED_VALUE',
  GREATER_THAN_OR_EQUAL_TO_0: 'GREATER_THAN_OR_EQUAL_TO_0',
  GREATER_THAN_0: 'GREATER_THAN_0',
  INVALID_CAPTCHA: 'INVALID_CAPTCHA',
  INVALID_LANGUAGE: 'INVALID_LANGUAGE',
  GREATER_OR_EQUAL_THAN_VALUE: (value) => `GREATER_OR_EQUAL_THAN_VALUE ${ value }`,
  LESS_OR_EQUAL_THAN_VALUE: (value) => `LESS_OR_EQUAL_THAN_VALUE ${ value }`,
  LENGTH_GREATER_OR_EQUAL_THAN_VALUE: (value) => `LENGTH_GREATER_OR_EQUAL_THAN_VALUE ${ value }`,
  LENGTH_LESS_OR_EQUAL_THAN_VALUE: (value) => `LENGTH_LESS_OR_EQUAL_THAN_VALUE ${ value }`,
  CANDIDATE_ROLE_NOT_ALLOWED: 'CANDIDATE_ROLE_NOT_ALLOWED',
  MAX_18_MONTHS: 'MAX_18_MONTHS',
  TOO_MANY_SUBMISSIONS: 'TOO_MANY_SUBMISSIONS',
  WHITELIST_VALUE: 'WHITELIST_CANNOT_HAVE_SAME_VALUE',
};