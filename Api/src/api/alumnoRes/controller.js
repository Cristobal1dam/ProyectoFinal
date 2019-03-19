import { success, notFound } from '../../services/response/'
import { AlumnoRes } from '.'
import { User } from '../user'
import { userInfo } from 'os';

export const create = ({ bodymen: { body } }, res, next) =>
  AlumnoRes.create(body)
    .then((alumnoRes) => alumnoRes.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  AlumnoRes.count(query)
    .then(count => AlumnoRes.find(query, select, cursor)
      .then((alumnoRes) => ({
        count,
        rows: alumnoRes.map((alumnoRes) => alumnoRes.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  AlumnoRes.findById(params.id)
    .then(notFound(res))
    .then((alumnoRes) => alumnoRes ? alumnoRes.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  AlumnoRes.findById(params.id)
    .then(notFound(res))
    .then((alumnoRes) => alumnoRes ? Object.assign(alumnoRes, body).save() : null)
    .then((alumnoRes) => alumnoRes ? alumnoRes.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  AlumnoRes.findById(params.id)
    .then(notFound(res))
    .then((alumnoRes) => alumnoRes ? alumnoRes.remove() : null)
    .then(success(res, 204))
    .catch(next)
  
 export const alumnosOneUser = async ({ querymen: { query, select, cursor }, params }, res, next) =>{
  var alumnosResLista = []
  await User.findById(params.id)
   .then(user => {

      for (let i = 0; i < user.alumnos.length; i++) {
        const element = user.alumnos[i];
        AlumnoRes.findById(element)
        .then(alumnoRes => alumnosResLista.push(alumnoRes))
        .catch(next) 
      }
      res.send(alumnosResLista)
   })
   .then(success(res, 200))
   .catch(next)
  
 }

export const listadoAlumnos = ({params, user}, res, next) => {

  user.alumnos;
  AlumnoRes.find({$and: [{},{}]})


}