import { success, notFound } from '../../services/response/'
import { User } from '.'
import { Alumno } from '../alumno'
import {AlumnoRes} from '../alumnoRes'
import {Visita} from '../visita'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  User.count(query)
    .then(count => User.find(query, select, cursor)
      .then(users => ({
        rows: users.map((user) => user.view()),
        count
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => {
   
      return User.findById(user.id)
      .populate('alumnos')
      .then(user => user.view())
    })
    
    .then(success(res))
    .catch(next)

export const showMe = ({ user }, res) =>
  res.json(user.view(true))

export const create = ({ bodymen: { body } }, res, next) =>
  User.create(body)
    .then((user) => user.view(true))
    .then(success(res, 201))
    .catch((err) => {
      /* istanbul ignore else */
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'email',
          message: 'email already registered'
        })
      } else {
        next(err)
      }
    })

export const update = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isAdmin = user.role === 'admin'
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other user\'s data'
        })
        return null
      }
      return result
    })
    .then((user) => user ? Object.assign(user, body).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const updatePassword = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: 'You can\'t change other user\'s password'
        })
        return null
      }
      return result
    })
    .then((user) => user ? user.set({ password: body.password }).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = async ({ params }, res, next) =>{
var alumnoResVar
var alumnoVar
var userVar
  await User.findById(params.id)
    .then(notFound(res))
    .then((user) => {
      userVar = user
      user.remove()

      for (let index = 0; index < userVar.alumnos.length; index++) {
        const element = user.alumnos[index];

       AlumnoRes.findById(element)
        .then(alumnoRes => {
          alumnoResVar = alumnoRes
          alumnoRes.remove()
        
          Alumno.findById(alumnoResVar.alumnoid)
        .then(alumno => {
          alumnoVar = alumno
          alumno.remove()

          Visita.find()
          .then(visitas =>{
            for (let index = 0; index < visitas.length; index++) {
              const element = visitas[index];
                for (let index2 = 0; index2 < alumnoVar.visitas.length; index2++) {
                  const element2 = alumnoVar.visitas[index2];
                  if (element.id == element2.id) {
                    Visita.findById(element.id)
                    .then(visita => visita.remove())
                    .catch(next) 
              }
            }
          }
        }).catch(next) 
        }).catch(next)            
        }).catch(next)       
      }
      res.send(user)
    })
    .then(success(res, 204))
    .catch(next)
  }

  export const filtrarAlumnos = async ({ params }, res, next) =>{
   
    await User.findById(params.id)
    .then(user => {
      console.log("Nombre por el que busca => " + params.nombre)
      Alumno.find({$and: [{id: {$in: user.alumnos}},{nombre: {$regex: params.nombre}}]})
      .then(alumnos => {
        console.log("Alumnos filtrados => " + alumnos)
        user.alumnos = alumnos
     
        res.send(user)
    }).then(success(res, 200))
    .catch(next)
    }).catch(next)

    
  }

 