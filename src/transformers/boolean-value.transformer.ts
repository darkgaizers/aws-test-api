import { Transform, TransformFnParams } from 'class-transformer';

export function TransformBooleanValue(): PropertyDecorator {
  return Transform(({ value }: TransformFnParams): boolean => {
    if (!value) {
      return;
    }

    return value === 'true';
  });
}
