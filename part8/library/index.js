const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./modules/author')
const Book = require('./modules/book')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log(`connection to ${MONGODB_URI}`);

mongoose.connect(MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB: ', error.message))

const typeDefs = `
  type Author {
    id: ID!
    name: String!
    bookCount: Int
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await Book.find({})
      return books.length
    },

    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length
    },

    allBooks: async (root, args) => {
      let books = await Book.find({}).populate('author')

      if(args.author) {
        books = books.filter(book => book.author === args.author)
      }

      if(args.genre) {
        books = books.filter(book => book.genres.includes(args.genre))
      }

      return books
    },

    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({}).populate('author')

      return authors.map(author => {
        const bookCount = books.reduce((a, book) => (book.author.name === author.name ? a + 1 : a), 0)

        return {
          name: author.name,
          id: author._id,
          born: author.born,
          bookCount
        }
      })
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })

        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Error al crear author', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error
            }
          })
        }
      }

      const book = new Book({ ...args, author: author })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Error al crear book', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }
      return book
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) return null

      author.born = args.setBornTo

      try {
        await author.save()
      } catch(error) {
        throw new GraphQLError('Error de edad', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})