import { Router } from 'express'
import { validateproduct } from './validator'
import * as controller from './productController';
import 'express-async-errors';

const route = Router()

route.get('/', controller.list);
route.post('/', validateproduct, controller.create);
route.get('/:id', controller.findOne);
route.put('/:id', controller.update);
route.delete('/:id', controller.deleteOne);

export default route;