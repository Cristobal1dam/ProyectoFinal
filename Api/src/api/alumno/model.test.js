import { Alumno } from '.'

let alumno

beforeEach(async () => {
  alumno = await Alumno.create({ nombre: 'test', email: 'test', telefono: 'test', tutor: 'test', visitas: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = alumno.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(alumno.id)
    expect(view.nombre).toBe(alumno.nombre)
    expect(view.email).toBe(alumno.email)
    expect(view.telefono).toBe(alumno.telefono)
    expect(view.tutor).toBe(alumno.tutor)
    expect(view.visitas).toBe(alumno.visitas)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = alumno.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(alumno.id)
    expect(view.nombre).toBe(alumno.nombre)
    expect(view.email).toBe(alumno.email)
    expect(view.telefono).toBe(alumno.telefono)
    expect(view.tutor).toBe(alumno.tutor)
    expect(view.visitas).toBe(alumno.visitas)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
