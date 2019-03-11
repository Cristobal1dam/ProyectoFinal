import mongoose, { Schema } from 'mongoose'

const tutorSchema = new Schema({
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
  empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empresa'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

tutorSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      empresa: this.empresa,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Tutor', tutorSchema)

export const schema = model.schema
export default model
