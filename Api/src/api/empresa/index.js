import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy,empresasDisp } from './controller'
import { schema } from './model'
export Empresa, { schema } from './model'

const router = new Router()
const { nombre, direccion, loc } = schema.tree

/**
 * @api {post} /empresas Create empresa
 * @apiName CreateEmpresa
 * @apiGroup Empresa
 * @apiParam nombre Empresa's nombre.
 * @apiParam direccion Empresa's direccion.
 * @apiParam loc Empresa's loc.
 * @apiSuccess {Object} empresa Empresa's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Empresa not found.
 */
router.post('/',
  body({ nombre, direccion, loc }),
  create)

/**
 * @api {get} /empresas Retrieve empresas
 * @apiName RetrieveEmpresas
 * @apiGroup Empresa
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of empresas.
 * @apiSuccess {Object[]} rows List of empresas.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

  

  router.get('/disp',
  empresasDisp)

/**
 * @api {get} /empresas/:id Retrieve empresa
 * @apiName RetrieveEmpresa
 * @apiGroup Empresa
 * @apiSuccess {Object} empresa Empresa's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Empresa not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /empresas/:id Update empresa
 * @apiName UpdateEmpresa
 * @apiGroup Empresa
 * @apiParam nombre Empresa's nombre.
 * @apiParam direccion Empresa's direccion.
 * @apiParam loc Empresa's loc.
 * @apiSuccess {Object} empresa Empresa's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Empresa not found.
 */
router.put('/:id',
  body({ nombre, direccion, loc }),
  update)

/**
 * @api {delete} /empresas/:id Delete empresa
 * @apiName DeleteEmpresa
 * @apiGroup Empresa
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Empresa not found.
 */
router.delete('/:id',
  destroy)

export default router
