/* eslint-disable global-require */
import request from 'supertest';
import { MockProxy } from 'jest-mock-extended';
import { Repository } from 'typeorm';

const app = require('../../src/app').default;

jest.mock('../../src/middlewares/Logger');
jest.mock('typeorm')
describe('product Module Tests', () => {

  const repository = (require('typeorm').repositoryMock) as MockProxy<Repository<any>>

  test('Should returna list of products', async () => {

    repository.find.mockResolvedValue([{ _id: '5e9dfe8bacb25e2e26c72916', name: 'product' }] as any)

    await request(app)
      .get('/product')
      .expect(200, [{ _id: '5e9dfe8bacb25e2e26c72916', name: 'product' }]);
  });

  test('should return one product', async () => {
    repository.findOne.mockResolvedValue({ _id: '5e9dfe8bacb25e2e26c72916', name: 'product' });
    await request(app)
      .get('/product/5e9dfe8bacb25e2e26c72916')
      .expect(200, { _id: '5e9dfe8bacb25e2e26c72916', name: 'product' });
  });

  test('should return error when product does not exists', async () => {
    repository.findOne.mockResolvedValue(undefined);
    await request(app)
      .get('/product/5e9dfe8bacb25e2e26c72916')
      .expect(404, {
        errors: [
          {
            "code": "PRODUCT_NOT_FOUND",
            "message": "product not found",
            "status": 404
          }
        ]
      })

  })

  test('should create one product', async () => {
    repository.save.mockResolvedValue({ _id: '5e9dfe8bacb25e2e26c72916', name: 'product' })
    await request(app)
      .post('/product')
      .send({ name: 'product' })
      .expect(200, { _id: '5e9dfe8bacb25e2e26c72916', name: 'product' });
  });

  test('should update one product', async () => {
    repository.update.mockResolvedValue({} as any);
    repository.findOne.mockResolvedValue({
      _id: '5e9dfe8bacb25e2e26c72916',
      name: 'User',
    });
    await request(app)
      .put('/product/5e9dfe8bacb25e2e26c72916')
      .send({ name: 'User' })
      .expect(200, { _id: '5e9dfe8bacb25e2e26c72916', name: 'User' });
  });

  test('should return error when update one User', async () => {
    repository.update.mockResolvedValue({} as any);
    repository.findOne.mockResolvedValue(undefined);
    await request(app)
      .put('/product/5e9dfe8bacb25e2e26c72916')
      .send({ name: 'User' })
      .expect(404, {
        errors: [
          {
            code: 'USER_NOT_FOUND',
            message: 'User not found',
            status: 404,
          },
        ],
      });
  });

  test('should delete one User', async () => {
    repository.delete.mockResolvedValue({} as any);
    repository.findOne.mockResolvedValue({
      _id: '5e9dfe8bacb25e2e26c72916',
      name: 'User',
    });
    await request(app)
      .delete('/product/5e9dfe8bacb25e2e26c72916')
      .send({ name: 'User' })
      .expect(200, { });
  });

  test('should return error when delete one User', async () => {
    repository.findOne.mockResolvedValue(undefined);
    await request(app)
      .delete('/product/5e9dfe8bacb25e2e26c72916')
      .send({ name: 'User' })
      .expect(404, {
        errors: [
          {
            code: 'USER_NOT_FOUND',
            message: 'User not found',
            status: 404,
          },
        ],
      });
  });
});
