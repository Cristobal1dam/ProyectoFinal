import { success, notFound } from '../../services/response/'
import { Alumno } from '.'
import { AlumnoRes } from '../alumnoRes'
import { Empresa} from '../empresa'
import { Tutor} from '../tutor'
import { User } from '../user'
import { userInfo } from 'os';

export const create = ({ bodymen: { body } }, res, next) =>
  Alumno.create(body)
    .then((alumno) => alumno.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Alumno.count(query)
    .then(count => Alumno.find(query, select, cursor)
      .then((alumnos) => ({
        count,
        rows: alumnos.map((alumno) => alumno.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Alumno.findById(params.id)
    .then(notFound(res))
    .then((alumno) => Alumno
    .findById(alumno.id)
    .populate('tutor')
    .populate('empresa')
    .exec() )
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Alumno.findById(params.id)
    .then(notFound(res))
    .then((alumno) => alumno ? Object.assign(alumno, body).save() : null)
    .then((alumno) => alumno ? alumno.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Alumno.findById(params.id)
    .then(notFound(res))
    .then((alumno) => alumno ? alumno.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const createAlumno = async ({ bodymen: { body }, params }, res, next) =>{
var idAlumno;
var varEmpresa;
var varTutor
var idAlumnoRes;
var userId = params.id;

const crearAlumno = await Alumno.create(body)
.then((alumno) => {
  
  idAlumno =  alumno.view(true).id
  alumno =  alumno
  return alumno.view(true)
})
.then(success(res, 201))
.catch(next)

 await Tutor.findById(body.tutor)
 .then(notFound(res))
 .then((tutor) =>{
varTutor = tutor
 }).then(success(res))
 .catch(next)

 await Empresa.findById(varTutor.empresa)
 .then(notFound(res))
 .then((empresa) =>{
varEmpresa = empresa
 }).then(success(res))
 .catch(next)

const crearAlumnoRes = await AlumnoRes.create({
  nombre: body.nombre,
  telefono: body.telefono,
  empresa: varEmpresa.nombre,
  alumnoid: idAlumno
})
  .then(proyectoRes => {
    proyectoRes.view(true)
    idAlumnoRes = proyectoRes.id
  })
  .then(success(res, 201))
  .catch(next)


await User.findById(userId)
        .then(notFound(res))
        .then((user) =>{
          user.alumnos.push(idAlumnoRes);
          user.save()

        })
          .then(success(res))
          .catch(next)


}

