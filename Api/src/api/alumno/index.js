import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, createAlumno } from './controller'
import { schema } from './model'
import { token } from '../../services/passport'
export Alumno, { schema } from './model'

const router = new Router()
const { nombre, email, telefono, tutor, visitas } = schema.tree

/**
 * @api {post} /alumnos Create alumno
 * @apiName createAlumno
 * @apiGroup Alumno
 * @apiParam nombre Alumno's nombre.
 * @apiParam email Alumno's email.
 * @apiParam telefono Alumno's telefono.
 * @apiParam tutor Alumno's tutor.
 * @apiParam visitas Alumno's visitas.
 * @apiSuccess {Object} alumno Alumno's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Alumno not found.
 */
router.post('/:id',
  body({ nombre, email, telefono, tutor, visitas }),
  token({ required: true }),
  createAlumno)

/**
 * @api {get} /alumnos Retrieve alumnos
 * @apiName RetrieveAlumnos
 * @apiGroup Alumno
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of alumnos.
 * @apiSuccess {Object[]} rows List of alumnos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
token({ required: true }),
  query(),
  index)

/**
 * @api {get} /alumnos/:id Retrieve alumno
 * @apiName RetrieveAlumno
 * @apiGroup Alumno
 * @apiSuccess {Object} alumno Alumno's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Alumno not found.
 */
router.get('/:id',
token({ required: true }),
  show)

/**
 * @api {put} /alumnos/:id Update alumno
 * @apiName UpdateAlumno
 * @apiGroup Alumno
 * @apiParam nombre Alumno's nombre.
 * @apiParam email Alumno's email.
 * @apiParam telefono Alumno's telefono.
 * @apiParam tutor Alumno's tutor.
 * @apiParam visitas Alumno's visitas.
 * @apiSuccess {Object} alumno Alumno's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Alumno not found.
 */
router.put('/:id',
  body({ nombre, email, telefono, tutor, visitas }),
  token({ required: true }),
  update)

/**
 * @api {delete} /alumnos/:id Delete alumno
 * @apiName DeleteAlumno
 * @apiGroup Alumno
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Alumno not found.
 */
router.delete('/:id',
token({ required: true }),
  destroy)

export default router
