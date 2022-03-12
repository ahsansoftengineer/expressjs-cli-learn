import { validateOrReject } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { plainToClass } from 'class-transformer'
import { product } from './product.entity'

export const validateproduct = async (req: Request, _: Response, next: NextFunction) => {

  const transformed = plainToClass(product, req.body);
  await validateOrReject(transformed);

  return next();

}