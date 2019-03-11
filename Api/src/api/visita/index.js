import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Visita, { schema } from './model'

const router = new Router()
const { titulo, fecha, realizada } = schema.tree

/**
 * @api {post} /visitas Create visita
 * @apiName CreateVisita
 * @apiGroup Visita
 * @apiParam titulo Visita's titulo.
 * @apiParam fecha Visita's fecha.
 * @apiParam realizada Visita's realizada.
 * @apiSuccess {Object} visita Visita's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Visita not found.
 */
router.post('/',
  body({ titulo, fecha, realizada }),
  create)

/**
 * @api {get} /visitas Retrieve visitas
 * @apiName RetrieveVisitas
 * @apiGroup Visita
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of visitas.
 * @apiSuccess {Object[]} rows List of visitas.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /visitas/:id Retrieve visita
 * @apiName RetrieveVisita
 * @apiGroup Visita
 * @apiSuccess {Object} visita Visita's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Visita not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /visitas/:id Update visita
 * @apiName UpdateVisita
 * @apiGroup Visita
 * @apiParam titulo Visita's titulo.
 * @apiParam fecha Visita's fecha.
 * @apiParam realizada Visita's realizada.
 * @apiSuccess {Object} visita Visita's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Visita not found.
 */
router.put('/:id',
  body({ titulo, fecha, realizada }),
  update)

/**
 * @api {delete} /visitas/:id Delete visita
 * @apiName DeleteVisita
 * @apiGroup Visita
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Visita not found.
 */
router.delete('/:id',
  destroy)

export default router
