const listHelper = require('../utils/list_helpers')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals to the likes of that', () => {
    const blogs = [{ title: "1", author: "1", url: "1", likes: 10 }]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(10)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      { title: "1", author: "1", url: "1", likes: 10 },
      { title: "2", author: "2", url: "2", likes: 1 },
      { title: "3", author: "3", url: "3", likes: 3 },
    ]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(14)
  })
})

describe('most likes', () => {
  test('empty list has no favourite', () => {
    const blogs = []
    const result = listHelper.favouriteBlog(blogs)
    expect(result).toBe("List is empty")
  })

  test('when list has only one blog equals to the likes of that', () => {
    const blogs = [{ title: "1", author: "1", url: "1", likes: 10 }]
    const result = listHelper.favouriteBlog(blogs)
    expect(result).toEqual({ title: "1", author: "1", likes: 10 })
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      { title: "1", author: "1", url: "1", likes: 10 },
      { title: "2", author: "2", url: "2", likes: 11 },
      { title: "3", author: "3", url: "3", likes: 3 },
    ]
    const result = listHelper.favouriteBlog(blogs)
    expect(result).toEqual({ title: "2", author: "2", likes: 11 })
  })
 })