import mongoose, { Schema } from 'mongoose'
import moment from 'moment'

const visitaSchema = new Schema({
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
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

visitaSchema.methods = {

  view (full) {
    moment.locale('es')
    const view = {
   
      // simple view
      id: this.id,
      titulo: this.titulo,
      fecha:  moment(this.fecha).format('D MMM h:mm a'),
      realizada: this.realizada,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Visita', visitaSchema)

export const schema = model.schema
export default model
