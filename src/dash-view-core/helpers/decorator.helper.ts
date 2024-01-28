export class DecoratorHelper {
  static buildOtherPropertyDecorator<T>(foreignKeyIDProperty: keyof T & string, initialDecorator: PropertyDecorator): PropertyDecorator {
    return (target: any, _key: string | symbol) => {
      initialDecorator(target, foreignKeyIDProperty.toString());
    };
  }
}