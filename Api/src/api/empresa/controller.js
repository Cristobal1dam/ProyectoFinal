import { success, notFound } from '../../services/response/'
import { Empresa } from '.'
import { Tutor } from '../tutor'
import { Alumno } from '../alumno'
import { AlumnoRes } from '../alumnoRes'
import {User} from '../user'

export const create = ({ bodymen: { body } }, res, next) =>
  Empresa.create(body)
    .then((empresa) => empresa.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Empresa.count(query)
    .then(count => Empresa.find(query, select, cursor)
      .then((empresas) => ({
        count,
        rows: empresas.map((empresa) => empresa.view())
      }))
    )
    .then(success(res))
    .catch(next)




export const show = ({ params }, res, next) =>
  Empresa.findById(params.id)
    .then(notFound(res))
    .then((empresa) => empresa ? empresa.view() : null)
    .then(success(res))
    .catch(next)

export const update = async ({ bodymen: { body }, params }, res, next) =>{
  var tutorVar
  var alumnoVar

  await Empresa.findById(params.id)
  .then(empresa =>{
    empresa.nombre = body.nombre
    empresa.direccion = body.direccion
    empresa.loc = body.loc
    empresa.save()
  })
  .catch(next)

  await Tutor.findOne({ "empresa": params.id})
  .then(tutor => tutorVar = tutor)
  .catch(next)

  await Alumno.findOne({'tutor': tutorVar.id})
  .then(alumno => alumnoVar = alumno)
  .catch(next)

  await AlumnoRes.findOne({'alumnoid':alumnoVar.id})
  .then(alumnoRes =>{
    alumnoRes.empresa = body.nombre
    res.send(alumnoRes.save())
  })
  .catch(next)

}

export const destroy = async ({ params }, res, next) =>{
var empresaVar
var tutorVar
var alumnoVar
var alumnoResVar

  await Empresa.findById(params.id)
    .then(notFound(res))
    .then((empresa) => {
      empresaVar = empresa
      return empresa ? empresa.remove() : null
    })
    .catch(next)

  await Tutor.findOne({'empresa' : empresaVar.id})
  .then(tutor =>{

    tutorVar = tutor
    return tutor ? tutor.remove() : null
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
  )
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

export const empresasDisp = async ( req, res, next) =>{
      var listaEmpresas
      var empresasNoDisp = []
      var empresasDisp = []
      
      await Empresa.find()
      .then(empresas =>{

        listaEmpresas = empresas
      })
      .catch(next)
  
      await Tutor.find()
      .then(tutores =>{
  
        for (let index = 0; index < listaEmpresas.length; index++) {

          const empresa = listaEmpresas[index];

  
          for (let index = 0; index < tutores.length; index++) {
            const tutor = tutores[index];
            if(empresa.id == tutor.empresa)
                empresasNoDisp.push(empresa)
   
          }
          
        }
  
        for (let index = 0; index < empresasNoDisp.length; index++) {
          const empresaNoDisp = empresasNoDisp[index];
  
          for (let index = 0; index < listaEmpresas.length; index++) {
            const empresa2 = listaEmpresas[index];
  
            if(empresaNoDisp.id != empresa2.id)
              empresasDisp.push(empresa2)
          }
            
          }
          
          if(empresasNoDisp.length == 0){
            res.send(listaEmpresas)
            }else
          res.send(empresasDisp)
          
    
      })
        .catch(next)

      }
    