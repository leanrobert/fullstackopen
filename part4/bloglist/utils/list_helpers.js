const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favouriteBlog = blogs => {
  if(blogs.length === 0) return "List is empty"

  const mostLikes = Math.max(...blogs.map(blog => blog.likes))
  const blogSelected = blogs.find(blog => blog.likes === mostLikes)

  return {
    title: blogSelected.title,
    author: blogSelected.author,
    likes: blogSelected.likes
  }
}

const mostBlogs = blogs => {
  const authors = []
  const results = []

  blogs.forEach(blog => {
    if(!authors.includes(blog.author)) {
      authors.push(blog.author)
      const newObj = {
        author: blog.author,
        blogs: 1
      }
      results.push(newObj)
    } else {
      results.map(result => {
        result.author === blog.author ? result.blogs += 1 : result.blogs
      })
    }
  });

  return(results.find(blog => blog.blogs === Math.max(...results.map(blog => blog.blogs))));
}

const mostLikes = blogs => {
  const authors = []
  const results = []

  blogs.forEach(blog => {
    if(!authors.includes(blog.author)) {
      authors.push(blog.author)
      const newObj = {
        author: blog.author,
        likes: blog.likes
      }
      results.push(newObj)
    } else {
      results.map(result => {
        result.author === blog.author ? result.likes += blog.likes : result.likes;
      })
    }
  })

  return(results.find(blog => blog.likes === Math.max(...results.map(blog => blog.likes))));
}

mostLikes([
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
])

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}