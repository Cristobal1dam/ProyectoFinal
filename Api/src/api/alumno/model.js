import mongoose, { Schema } from 'mongoose'

const alumnoSchema = new Schema({
  nombre: {
    type: String
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  telefono: {
    type: Number
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor'
  },
  visitas: [{
    
      titulo: {
        type: String
      },
      fecha: {
        type: Date
      },
      realizada: {
        type: Boolean,
        default: false
      }
    
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

alumnoSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      tutor: this.tutor,
      visitas: this.visitas,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Alumno', alumnoSchema)

export const schema = model.schema
export default model
