import { Repository, DeleteResult } from 'typeorm'
import { plainToClass } from 'class-transformer';
import { CustomError } from 'express-handler-errors';
import { dbConnections } from "../../config/config"
import { product } from './product.entity';
import { connection } from '../../helper/getConnection';

export class ProductService {

  private readonly repository!: Repository<product>

  constructor() {
    this.repository = connection(product, dbConnections.mongo.name);
  }

  async list(): Promise<product[]> {
    return this.repository.find()
  }

  async create(obj: product): Promise<product> {
    const data = plainToClass(product, obj)
    return this.repository.save(data)
  }

  async findOne(id: string): Promise<product> {
    const service = await this.repository.findOne(id)
    if(!service) throw new CustomError({
      code: 'PRODUCT_NOT_FOUND',
      message: 'product not found',
      status: 404
    })
    return service
  }

  async update(id: string, obj: product): Promise<product> {

    await this.repository.update(id, obj);
    return this.findOne(id);

  }

  async delete(id: string): Promise<DeleteResult> {
    await this.findOne(id)
    return this.repository.delete(id);
  }

}

export default new ProductService()
