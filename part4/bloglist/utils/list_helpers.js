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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}