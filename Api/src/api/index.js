import { Router } from 'express'
import user from './user'
import auth from './auth'
import empresa from './empresa'
import tutor from './tutor'
import visita from './visita'
import alumno from './alumno'
import alumnoRes from './alumnoRes'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user)
router.use('/auth', auth)
router.use('/empresas', empresa)
router.use('/tutors', tutor)
router.use('/visitas', visita)
router.use('/alumnos', alumno)
router.use('/alumnoRes', alumnoRes)
router.use('/alumnoRes', alumnoRes)

export default router
