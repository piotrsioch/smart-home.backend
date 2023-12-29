import { plainToInstance } from 'class-transformer';

export function mapObjectToDto<TDto>(
  dtoClass: new () => TDto,
  plainObject: Record<string, any>,
): TDto {
  return plainToInstance(dtoClass, plainObject);
}
