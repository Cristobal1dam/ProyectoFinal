import { Visita } from '.'

let visita

beforeEach(async () => {
  visita = await Visita.create({ titulo: 'test', fecha: 'test', realizada: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = visita.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(visita.id)
    expect(view.titulo).toBe(visita.titulo)
    expect(view.fecha).toBe(visita.fecha)
    expect(view.realizada).toBe(visita.realizada)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = visita.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(visita.id)
    expect(view.titulo).toBe(visita.titulo)
    expect(view.fecha).toBe(visita.fecha)
    expect(view.realizada).toBe(visita.realizada)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
