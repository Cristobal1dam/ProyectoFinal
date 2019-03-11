import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { AlumnoRes } from '.'

const app = () => express(apiRoot, routes)

let alumnoRes

beforeEach(async () => {
  alumnoRes = await AlumnoRes.create({})
})

test('POST /alumnoRes 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ nombre: 'test', telefono: 'test', visita: 'test', empresa: 'test', alumnoid: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.nombre).toEqual('test')
  expect(body.telefono).toEqual('test')
  expect(body.visita).toEqual('test')
  expect(body.empresa).toEqual('test')
  expect(body.alumnoid).toEqual('test')
})

test('GET /alumnoRes 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /alumnoRes/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${alumnoRes.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(alumnoRes.id)
})

test('GET /alumnoRes/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /alumnoRes/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${alumnoRes.id}`)
    .send({ nombre: 'test', telefono: 'test', visita: 'test', empresa: 'test', alumnoid: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(alumnoRes.id)
  expect(body.nombre).toEqual('test')
  expect(body.telefono).toEqual('test')
  expect(body.visita).toEqual('test')
  expect(body.empresa).toEqual('test')
  expect(body.alumnoid).toEqual('test')
})

test('PUT /alumnoRes/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ nombre: 'test', telefono: 'test', visita: 'test', empresa: 'test', alumnoid: 'test' })
  expect(status).toBe(404)
})

test('DELETE /alumnoRes/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${alumnoRes.id}`)
  expect(status).toBe(204)
})

test('DELETE /alumnoRes/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
