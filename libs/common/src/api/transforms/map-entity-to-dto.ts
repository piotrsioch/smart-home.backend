import { plainToInstance } from 'class-transformer';
import { BaseMongoEntity } from '../../infrastructure';

export function mapEntityToDto<TDto, TEntity extends BaseMongoEntity>(
  dtoClass: new () => TDto,
  entity: TEntity,
): TDto {
  return plainToInstance(dtoClass, entity);
}
