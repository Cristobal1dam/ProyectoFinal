import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Visita } from '.'

const app = () => express(apiRoot, routes)

let visita

beforeEach(async () => {
  visita = await Visita.create({})
})

test('POST /visitas 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ titulo: 'test', fecha: 'test', realizada: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.titulo).toEqual('test')
  expect(body.fecha).toEqual('test')
  expect(body.realizada).toEqual('test')
})

test('GET /visitas 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /visitas/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${visita.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(visita.id)
})

test('GET /visitas/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /visitas/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${visita.id}`)
    .send({ titulo: 'test', fecha: 'test', realizada: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(visita.id)
  expect(body.titulo).toEqual('test')
  expect(body.fecha).toEqual('test')
  expect(body.realizada).toEqual('test')
})

test('PUT /visitas/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ titulo: 'test', fecha: 'test', realizada: 'test' })
  expect(status).toBe(404)
})

test('DELETE /visitas/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${visita.id}`)
  expect(status).toBe(204)
})

test('DELETE /visitas/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
