import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Alumno } from '.'

const app = () => express(apiRoot, routes)

let alumno

beforeEach(async () => {
  alumno = await Alumno.create({})
})

test('POST /alumnos 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ nombre: 'test', email: 'test', telefono: 'test', tutor: 'test', visitas: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.nombre).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.telefono).toEqual('test')
  expect(body.tutor).toEqual('test')
  expect(body.visitas).toEqual('test')
})

test('GET /alumnos 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /alumnos/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${alumno.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(alumno.id)
})

test('GET /alumnos/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /alumnos/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${alumno.id}`)
    .send({ nombre: 'test', email: 'test', telefono: 'test', tutor: 'test', visitas: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(alumno.id)
  expect(body.nombre).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.telefono).toEqual('test')
  expect(body.tutor).toEqual('test')
  expect(body.visitas).toEqual('test')
})

test('PUT /alumnos/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ nombre: 'test', email: 'test', telefono: 'test', tutor: 'test', visitas: 'test' })
  expect(status).toBe(404)
})

test('DELETE /alumnos/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${alumno.id}`)
  expect(status).toBe(204)
})

test('DELETE /alumnos/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
