import { Transform, TransformFnParams } from 'class-transformer';

export function TransformMultipleValues(isNumber: boolean = false): PropertyDecorator {
  return Transform(({ value }: TransformFnParams): number[] => {
    if (!value) {
      return;
    }

    if (!(value instanceof Array)) {
      value = [value];
    }

    return value.map((v: number) => isNumber ? +v : v);
  });
}
