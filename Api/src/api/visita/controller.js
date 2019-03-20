import { success, notFound } from '../../services/response/'
import { Visita } from '.'
import { Alumno } from '../alumno'
import { AlumnoRes } from '../alumnoRes'

export const create = ({ bodymen: { body } }, res, next) =>
  Visita.create(body)
    .then((visita) => visita.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Visita.count(query)
    .then(count => Visita.find(query, select, cursor)
      .then((visitas) => ({
        count,
        rows: visitas.map((visita) => visita.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Visita.findById(params.id)
    .then(notFound(res))
    .then((visita) => visita ? visita.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Visita.findById(params.id)
    .then(notFound(res))
    .then((visita) => visita ? Object.assign(visita, body).save() : null)
    .then((visita) => visita ? visita.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = async ({ params }, res, next) =>{
  var visitaVar
  var alumnoVar
  var fechaVar = "";
  
 
  await Visita.findById(params.id)
    .then(notFound(res))
    .then((visita) => {
      visitaVar = visita
      visita.remove()})
      .catch(next)

  await Alumno.findOne({'visitas.fecha': visitaVar.fecha})
  .then(alumno =>{
    
    for (let index = 0; index < alumno.visitas.length; index++) {
      const element = alumno.visitas[index];
        if(element.fecha.getTime() === visitaVar.fecha.getTime()){
        alumno.visitas.splice(index, 1);
        }
    }
    if(alumno.visitas.length != 0){
    fechaVar = alumno.visitas[0].fecha;
    }

    alumnoVar = alumno
    alumno.save()
  }).catch(next)

  await AlumnoRes.findOne({'alumnoid' : alumnoVar.id})
  .then(alumnoRes => {
    
      alumnoRes.visita = fechaVar
      return alumnoRes.save()
  })
  .then(success(res, 204))
  .catch(next)
  }
export const createVisita = async ({ bodymen: { body }, params }, res, next) =>{

      var varVisita;
      var alumnoId = params.id;
      
      const crearVisita = await Visita.create(body)
      .then((visita) => {
        
  
        varVisita =  visita
        return visita.view(true)
      })
      .then(success(res, 201))
      .catch(next)

      await AlumnoRes.findOne({ "alumnoid": params.id })
       .then(notFound(res))
       .then((alumnoRes) =>{
        alumnoRes.visita = varVisita.fecha
        alumnoRes.save()
       }).then(success(res))
       .catch(next)

       await Alumno.findById(params.id)
              .then(notFound(res))
              .then((alumno) =>{
                alumno.visitas.push(varVisita);
                alumno.save()
      
              })
                .then(success(res))
                .catch(next)

      
      }
      
export const realizadaVisita = async ({params},res, next) => {
var visitaVar
var alumnoVar
var fechaVar = ""
  await Visita.findById(params.id)
  .then(notFound(res))
  .then((visita) => {
    visita.realizada = (visita.realizada) ? false : true
    visitaVar = visita
    visita.save()

   })
    .catch(next)
        
        await Alumno.findOne({'visitas.fecha': visitaVar.fecha})
        .then(alumno =>{
          alumnoVar = alumno;
    
          for (let index = 0; index < alumno.visitas.length; index++) {
            const element = alumno.visitas[index];
              if(element.fecha.getTime() === visitaVar.fecha.getTime()){
                alumno.visitas.splice(index, 1);
                alumno.visitas.push(visitaVar)
              }
              if(alumno.visitas.length != 0){
                fechaVar = alumno.visitas[0].fecha
              }
          }
           alumno.save()

        
      }).catch(next)


  await AlumnoRes.findOne({'alumnoid' : alumnoVar.id})
  .then(alumnoRes => {
      if(visitaVar.realizada){
        if(alumnoRes.visita.getTime() === visitaVar.fecha.getTime()){
            alumnoRes.visita = fechaVar
        }
      }else{
          alumnoRes.visita = visitaVar.fecha
      }

      alumnoRes.save()

      res.send(visitaVar)    
  })
  .then(success(res, 400))
  .catch(next)


      
    }    
