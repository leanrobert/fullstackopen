import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3 },
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

const Person = mongoose.model('Person', personSchema)

export default Person
