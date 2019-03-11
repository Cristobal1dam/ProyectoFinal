import { AlumnoRes } from '.'

let alumnoRes

beforeEach(async () => {
  alumnoRes = await AlumnoRes.create({ nombre: 'test', telefono: 'test', visita: 'test', empresa: 'test', alumnoid: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = alumnoRes.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(alumnoRes.id)
    expect(view.nombre).toBe(alumnoRes.nombre)
    expect(view.telefono).toBe(alumnoRes.telefono)
    expect(view.visita).toBe(alumnoRes.visita)
    expect(view.empresa).toBe(alumnoRes.empresa)
    expect(view.alumnoid).toBe(alumnoRes.alumnoid)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = alumnoRes.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(alumnoRes.id)
    expect(view.nombre).toBe(alumnoRes.nombre)
    expect(view.telefono).toBe(alumnoRes.telefono)
    expect(view.visita).toBe(alumnoRes.visita)
    expect(view.empresa).toBe(alumnoRes.empresa)
    expect(view.alumnoid).toBe(alumnoRes.alumnoid)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
