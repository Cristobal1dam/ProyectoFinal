import { Tutor } from '.'

let tutor

beforeEach(async () => {
  tutor = await Tutor.create({ nombre: 'test', email: 'test', telefono: 'test', empresa: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = tutor.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tutor.id)
    expect(view.nombre).toBe(tutor.nombre)
    expect(view.email).toBe(tutor.email)
    expect(view.telefono).toBe(tutor.telefono)
    expect(view.empresa).toBe(tutor.empresa)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = tutor.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tutor.id)
    expect(view.nombre).toBe(tutor.nombre)
    expect(view.email).toBe(tutor.email)
    expect(view.telefono).toBe(tutor.telefono)
    expect(view.empresa).toBe(tutor.empresa)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
