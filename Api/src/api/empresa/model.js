import mongoose, { Schema } from 'mongoose'

const empresaSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  loc: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

empresaSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      nombre: this.nombre,
      direccion: this.direccion,
      loc: this.loc,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}


/*schema.pre('remove', async function() {
  await 
  await doMoreStuff();
});*/

const model = mongoose.model('Empresa', empresaSchema)

export const schema = model.schema
export default model
