import { HttpException } from '@nestjs/common/exceptions/http.exception';

export abstract class CoreHttpException extends HttpException {
  protected constructor(statusCode: number, message: string = '') {
    super(message, statusCode);
  }
}
