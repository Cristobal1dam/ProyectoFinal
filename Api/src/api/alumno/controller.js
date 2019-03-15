import { success, notFound } from '../../services/response/'
import { Alumno } from '.'
import { AlumnoRes } from '../alumnoRes'
import { Empresa} from '../empresa'
import { Tutor} from '../tutor'
import { User } from '../user'
import { Visita } from '../visita'
import { userInfo } from 'os';

export const create = ({ bodymen: { body } }, res, next) =>
  Alumno.create(body)
    .then((alumno) => alumno.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Alumno.count(query)
    .then(count => Alumno.find(query, select, cursor)
    .populate('tutor')
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
    .populate({ path: 'tutor', populate: { path: 'empresa', select: 'nombre direccion loc' } })
    .exec() )
    .then(success(res))
    .catch(next)

export const update = async ({ bodymen: { body }, params }, res, next) =>{
  var tutorVar
  var empresaVar
  await Alumno.findById(params.id)
    .then(notFound(res))
    .then((alumno) => {
      alumno.nombre = body.nombre
      alumno.email = body.email
      alumno.telefono = body.telefono
      alumno.tutor = body.tutor
      alumno.save()
    })
    .catch(next)

  await Tutor.findById(body.tutor)
    .then(tutor => tutorVar = tutor)
    .catch(next)

  await Empresa.findById(tutorVar.empresa)
    .then(empresa => empresaVar = empresa)
    .catch(next)

  await AlumnoRes.findOne({'alumnoid': params.id})
    .then(alumnoRes =>{
      alumnoRes.nombre = body.nombre
      alumnoRes.telefono = body.telefono
      alumnoRes.empresa = empresaVar.nombre

      res.send(alumnoRes.save())
    })
    .catch(next)

  }
export const destroy = async ({ params }, res, next) =>{
  var alumnoVar
  var alumnoResVar
  var alumnosId
  await Alumno.findById(params.id)
    .then(notFound(res))
    .then((alumno) =>{
       alumnoVar = alumno
       alumno ? alumno.remove() : null
      })
    .then(success(res, 200))
    .catch(next)

  await AlumnoRes.findOne({'alumnoid' : alumnoVar.id})
    .then(alumnoRes =>{
      alumnoResVar = alumnoRes
      alumnoRes ? alumnoRes.remove() : null
    }
    ).then(success(res, 200))
    .catch(next)

  await User.findOne({'alumnos': alumnoResVar.id})
  .then(user => {

      for (let index = 0; index < user.alumnos.length; index++) {
        const element = user.alumnos[index];
        if (element == alumnoResVar.id) {
          user.alumnos.splice(index, 1);
        }
    }
    return user.save()
    }).catch(next)

    await Visita.find()
    .then(visitas =>{
      for (let index = 0; index < visitas.length; index++) {
        const element = visitas[index];
          for (let index2 = 0; index2 < alumnoVar.visitas.length; index++) {
            const element2 = alumnoVar.visitas[index2];
            if (element.id == element2.id) {
              Visita.findById(element.id)
              .then(visita => visita.remove())
              .catch(next) 
        }
      }
    }
    })
    .then(success(res, 204))
    .catch(next)
    }

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