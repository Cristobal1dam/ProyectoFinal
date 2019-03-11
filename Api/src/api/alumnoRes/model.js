import mongoose, { Schema } from 'mongoose'

const alumnoResSchema = new Schema({
  nombre: {
    type: String
  },
  telefono: {
    type: Number
  },
  visita: {
    type: Date
  },
  empresa: {
    type: String
  },
  alumnoid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'alumno'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

alumnoResSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      nombre: this.nombre,
      telefono: this.telefono,
      visita: this.visita,
      empresa: this.empresa,
      alumnoid: this.alumnoid,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('AlumnoRes', alumnoResSchema)

export const schema = model.schema
export default model
