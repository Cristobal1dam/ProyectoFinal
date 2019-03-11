import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export AlumnoRes, { schema } from './model'

const router = new Router()
const { nombre, telefono, visita, empresa, alumnoid } = schema.tree

/**
 * @api {post} /alumnoRes Create alumno res
 * @apiName CreateAlumnoRes
 * @apiGroup AlumnoRes
 * @apiParam nombre Alumno res's nombre.
 * @apiParam telefono Alumno res's telefono.
 * @apiParam visita Alumno res's visita.
 * @apiParam empresa Alumno res's empresa.
 * @apiParam alumnoid Alumno res's alumnoid.
 * @apiSuccess {Object} alumnoRes Alumno res's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Alumno res not found.
 */
router.post('/',
  body({ nombre, telefono, visita, empresa, alumnoid }),
  create)

/**
 * @api {get} /alumnoRes Retrieve alumno res
 * @apiName RetrieveAlumnoRes
 * @apiGroup AlumnoRes
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of alumno res.
 * @apiSuccess {Object[]} rows List of alumno res.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /alumnoRes/:id Retrieve alumno res
 * @apiName RetrieveAlumnoRes
 * @apiGroup AlumnoRes
 * @apiSuccess {Object} alumnoRes Alumno res's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Alumno res not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /alumnoRes/:id Update alumno res
 * @apiName UpdateAlumnoRes
 * @apiGroup AlumnoRes
 * @apiParam nombre Alumno res's nombre.
 * @apiParam telefono Alumno res's telefono.
 * @apiParam visita Alumno res's visita.
 * @apiParam empresa Alumno res's empresa.
 * @apiParam alumnoid Alumno res's alumnoid.
 * @apiSuccess {Object} alumnoRes Alumno res's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Alumno res not found.
 */
router.put('/:id',
  body({ nombre, telefono, visita, empresa, alumnoid }),
  update)

/**
 * @api {delete} /alumnoRes/:id Delete alumno res
 * @apiName DeleteAlumnoRes
 * @apiGroup AlumnoRes
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Alumno res not found.
 */
router.delete('/:id',
  destroy)

export default router
