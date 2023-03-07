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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}