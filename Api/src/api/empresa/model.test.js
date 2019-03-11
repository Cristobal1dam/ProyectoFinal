import { Empresa } from '.'

let empresa

beforeEach(async () => {
  empresa = await Empresa.create({ nombre: 'test', direccion: 'test', loc: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = empresa.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(empresa.id)
    expect(view.nombre).toBe(empresa.nombre)
    expect(view.direccion).toBe(empresa.direccion)
    expect(view.loc).toBe(empresa.loc)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = empresa.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(empresa.id)
    expect(view.nombre).toBe(empresa.nombre)
    expect(view.direccion).toBe(empresa.direccion)
    expect(view.loc).toBe(empresa.loc)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
