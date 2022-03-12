import { Request, Response } from 'express'
import product from './productService'

export const list = async (_: Request, res: Response) => {
  const response = await product.list()
  res.json(response);
}

export const create = async (req: Request, res: Response) => {
  const response = await product.create(req.body);
  res.json(response)
}

export const findOne = async (req: Request, res: Response) => {
  const { id } = req.params
  const response = await product.findOne(id);
  res.json(response)
}

export const update = async (req: Request, res: Response) => {
  const { id } = req.params
  const response = await product.update(id, req.body);
  res.json(response)
}

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params
  const response = await product.delete(id);
  res.json(response)
}