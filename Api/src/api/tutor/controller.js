import { success, notFound } from '../../services/response/'
import { Tutor } from '.'
import { Empresa } from '../empresa/'
import { Alumno } from '../alumno'
import { AlumnoRes } from '../alumnoRes'

export const create = ({ bodymen: { body } }, res, next) =>
  Tutor.create(body)
    .then((tutor) => tutor.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Tutor.count(query)
    .then(count => Tutor.find(query, select, cursor)
    .populate('empresa','nombre direccion loc')
      .then((tutors) => ({
        count,
        rows: tutors.map((tutor) => tutor.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Tutor.findById(params.id)
    .then(notFound(res))
    .then((tutor) => {
   
    return Tutor.findById(tutor.id)
    .populate('empresa','nombre direccion loc')
    .exec()})
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Tutor.findById(params.id)
    .then(notFound(res))
    .then((tutor) => tutor ? Object.assign(tutor, body).save() : null)
    .then((tutor) => tutor ? tutor.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = async ({ params }, res, next) =>{
  var tutorVar
  var alumnoVar
  var alumnoResVar

  await Tutor.findById(params.id)
    .then(notFound(res))
    .then((tutor) => {
      tutorVar = tutor
      tutor ? tutor.remove() : null
    })
    .catch(next)

  await Alumno.findOne({'tutor' : tutorVar.id})
  .then(alumno =>{
    alumnoVar = alumno
    return alumno ? alumno.remove() : null
  })
  .catch(next)

  await AlumnoRes.findOne({'alumnoid' : alumnoVar.id})
  .then(alumnoRes =>{
    alumnoResVar = alumnoRes
    return alumnoRes ? alumnoRes.remove() : null
  }
  ).then(success(res, 204))
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
      })
    .then(success(res, 204))
    .catch(next)
}

export const tutoresDisp = async ( req, res, next) =>{
  var listaTutores
  var tutoresNoDisp = []
  var tutoresDisp = []
  
  await Tutor.find()
  .then(tutores =>{
    listaTutores = tutores
  })
  .catch(next)

  await Alumno.find()
  .then(alumnos =>{


    for (let index = 0; index < listaTutores.length; index++) {

      const tutor = listaTutores[index];


      for (let index = 0; index < alumnos.length; index++) {
        const alumno = alumnos[index];
        if(tutor.id == alumno.tutor)
            tutoresNoDisp.push(tutor)

      }
      
    }

    console.log(tutoresNoDisp)

    for (let index = 0; index < tutoresNoDisp.length; index++) {
      const tutorNoDisp = tutoresNoDisp[index];

      for (let index = 0; index < listaTutores.length; index++) {
        const tutor2 = listaTutores[index];
   
        if(tutorNoDisp.id != tutor2.id)
        tutoresDisp.push(tutor2)

      }
        
      }

      if(tutoresNoDisp.length == 0){
      res.send(listaTutores)
      }else
      res.send(tutoresDisp)
      

  })
    .catch(next)

  }
