import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Tutor } from '.'

const app = () => express(apiRoot, routes)

let tutor

beforeEach(async () => {
  tutor = await Tutor.create({})
})

test('POST /tutors 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ nombre: 'test', email: 'test', telefono: 'test', empresa: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.nombre).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.telefono).toEqual('test')
  expect(body.empresa).toEqual('test')
})

test('GET /tutors 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /tutors/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${tutor.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tutor.id)
})

test('GET /tutors/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /tutors/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${tutor.id}`)
    .send({ nombre: 'test', email: 'test', telefono: 'test', empresa: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tutor.id)
  expect(body.nombre).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.telefono).toEqual('test')
  expect(body.empresa).toEqual('test')
})

test('PUT /tutors/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ nombre: 'test', email: 'test', telefono: 'test', empresa: 'test' })
  expect(status).toBe(404)
})

test('DELETE /tutors/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tutor.id}`)
  expect(status).toBe(204)
})

test('DELETE /tutors/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
