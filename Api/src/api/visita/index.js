import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, createVisita, realizadaVisita } from './controller'
import { token } from '../../services/passport'
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
router.post('/:id',
  body({ titulo, fecha, realizada }),
  token({ required: true }),
  createVisita)

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
token({ required: true }),
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
token({ required: true }),
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
  token({ required: true }),
  update)

/**
 * @api {delete} /visitas/:id Delete visita
 * @apiName DeleteVisita
 * @apiGroup Visita
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Visita not found.
 */
router.delete('/:id',
token({ required: true }),
  destroy)

router.put('/realizada/:id',
token({ required: true }),
realizadaVisita)

export default router
