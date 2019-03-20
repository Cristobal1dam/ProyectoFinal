import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy , alumnosOneUser} from './controller'
import { schema } from './model'
import { token } from '../../services/passport'
export AlumnoRes, { schema } from './model'

const router = new Router()
const { nombre, telefono, visita, empresa, alumnoid } = schema.tree

/*const alumnoSchema = new Schema({
  nombre: {
    type: [String],
    paths: ['nombre']
  },
  empresa: {
    type: [String],
    paths: ['empresa']
  }  
})*/

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
  token({ required: true }),
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
  token({ required: true }),
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
token({ required: true }),
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
  token({ required: true }),
  update)

/**
 * @api {delete} /alumnoRes/:id Delete alumno res
 * @apiName DeleteAlumnoRes
 * @apiGroup AlumnoRes
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Alumno res not found.
 */
router.delete('/:id',
token({ required: true }),
  destroy)


/*router.get('/alumnoRes/filtro',

  filtradoAlumnos)*/

/*router.get('/alumnosuser/:id',
query(alumnoSchema),
  alumnosOneUser)
*/
export default router
