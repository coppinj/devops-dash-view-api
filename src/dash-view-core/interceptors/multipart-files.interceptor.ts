import { BadRequestException, CallHandler, ExecutionContext, mixin, NestInterceptor, Type } from '@nestjs/common';
import { Observable } from 'rxjs';

export function MultipartFilesInterceptor(
  fieldName: string,
): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    constructor() {
    }

    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest();
      const response = ctx.getResponse();

      if (!request.isMultipart()) {
        response.code(400).send(new Error('Request is not multipart'));

        return;
      }

      request.body = {};
      request.body[fieldName] = [];

      await new Promise((resolve, _) => {
        const mp = request.multipart(handler, (err: any) => {
          if (err) {
            throw new BadRequestException(err);
          }

          resolve(true);
        });

        // = Field
        mp.on('field', (key: string, value: any) => {
          request.body[key] = value;
        });

        function handler(field: string, file: any, filename: string, encoding: string, mimetype: string) {
          // to accumulate the file in memory! Be careful!
          //
          file.pipe(require('concat-stream')((buf: Buffer) => {
            if (fieldName === field.replace(/\[|\]/g, '')) {
              request.body[fieldName].push({
                originalname: filename,
                mimetype,
                encoding,
                buffer: buf,
                size: buf.length,
              });
            }
          }));
        }
      });

      return next.handle();
    }
  }

  const Interceptor = mixin(MixinInterceptor);

  return Interceptor as Type<NestInterceptor>;
}
