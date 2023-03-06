import mongoose from 'mongoose'

const password = process.argv[2]
const url = `mongodb+srv://leanrobert:${password}@cluster0.qbw8tgf.mongodb.net/?retryWrites=true&w=majority&dbname=phonebook`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 3) {
  console.log('Give password as argument');
  process.exit(1)
} else if (process.argv.length < 5 && process.argv.length > 3) {
  console.log('Give name and number records');
  process.exit(1)
}

const name = process.argv[3]
const number = process.argv[4]

if (process.argv.length === 5) {
  const newPerson = new Person({ name, number })

  newPerson.save().then(res => {
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  Person.find({}).then(res => {
    console.log("phonebook");
    res.forEach(pers => console.log(pers))
    mongoose.connection.close()
  })
}

