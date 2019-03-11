import { success, notFound } from '../../services/response/'
import { Empresa } from '.'

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

export const update = ({ bodymen: { body }, params }, res, next) =>
  Empresa.findById(params.id)
    .then(notFound(res))
    .then((empresa) => empresa ? Object.assign(empresa, body).save() : null)
    .then((empresa) => empresa ? empresa.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Empresa.findById(params.id)
    .then(notFound(res))
    .then((empresa) => empresa ? empresa.remove() : null)
    .then(success(res, 204))
    .catch(next)
