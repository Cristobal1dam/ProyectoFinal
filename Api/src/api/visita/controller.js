import { success, notFound } from '../../services/response/'
import { Visita } from '.'

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

export const destroy = ({ params }, res, next) =>
  Visita.findById(params.id)
    .then(notFound(res))
    .then((visita) => visita ? visita.remove() : null)
    .then(success(res, 204))
    .catch(next)
