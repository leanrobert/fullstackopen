const { UserInputError, AuthenticationErro } = require('@apollo/server')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')
const Author = require('./modules/author')
const User = require('./modules/user')
const Book = require('./modules/book')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),

    authorCount: async () => await Author.collection.countDocuments(),

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

    me: (root, args, { currentUser}) => { return currentUser }
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }

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

      pubsub.publish("BOOK_ADDED", { bookAdded: book })
      return book
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }

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
    },

    createUser: async (root, args) => {
      if(!args.username || !args.favoriteGenre) {
        throw new GraphQLError('username or favoriteGenre is missing', {
          extensions: {
            invalidArgs: args,
          }
        })
      }

      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw newraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED")
    }
  }
}

module.exports = resolvers