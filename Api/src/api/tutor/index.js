import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, tutoresDisp } from './controller'
import { schema } from './model'
import { token } from '../../services/passport'
export Tutor, { schema } from './model'

const router = new Router()
const { nombre, email, telefono, empresa } = schema.tree

/**
 * @api {post} /tutors Create tutor
 * @apiName CreateTutor
 * @apiGroup Tutor
 * @apiParam nombre Tutor's nombre.
 * @apiParam email Tutor's email.
 * @apiParam telefono Tutor's telefono.
 * @apiParam empresa Tutor's empresa.
 * @apiSuccess {Object} tutor Tutor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tutor not found.
 */
router.post('/',
  body({ nombre, email, telefono, empresa }),
  token({ required: true }),
  create)

/**
 * @api {get} /tutors Retrieve tutors
 * @apiName RetrieveTutors
 * @apiGroup Tutor
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of tutors.
 * @apiSuccess {Object[]} rows List of tutors.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  token({ required: true }),
  index)

  
  router.get('/disp',
  token({ required: true }),
  tutoresDisp)
/**
 * @api {get} /tutors/:id Retrieve tutor
 * @apiName RetrieveTutor
 * @apiGroup Tutor
 * @apiSuccess {Object} tutor Tutor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tutor not found.
 */
router.get('/:id',
token({ required: true }),
  show)

/**
 * @api {put} /tutors/:id Update tutor
 * @apiName UpdateTutor
 * @apiGroup Tutor
 * @apiParam nombre Tutor's nombre.
 * @apiParam email Tutor's email.
 * @apiParam telefono Tutor's telefono.
 * @apiParam empresa Tutor's empresa.
 * @apiSuccess {Object} tutor Tutor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tutor not found.
 */
router.put('/:id',
  body({ nombre, email, telefono, empresa }),
  token({ required: true }),
  update)

/**
 * @api {delete} /tutors/:id Delete tutor
 * @apiName DeleteTutor
 * @apiGroup Tutor
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Tutor not found.
 */
router.delete('/:id',
token({ required: true }),
  destroy)

export default router
