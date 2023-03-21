import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      console.log(action.payload);
      const id = action.payload.id
      return state.map(blog => blog.id !== id ? blog : action.payload)
    },
    remove(state, action) {
      return state.filter((b) => b.id !== action.payload.id)
    }
  }
})

export const { setBlogs, appendBlog, vote, remove } = blogsSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlogRed = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog))
  }
}

export const voteBlog = blog => {
  return async dispatch => {
    console.log(blog);
    const blogToUpdate = { 
      ...blog, 
      likes: blog.likes + 1, 
      user: blog.user.id 
    }
    const updatedBlog = await blogService.update(blogToUpdate);
    dispatch(vote(updatedBlog))
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog.id);
    dispatch(remove(blog))
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    await blogService.comment(id, comment)
    const blog = await blogService.getOne(id)
    dispatch(vote(blog))
  }
}

export default blogsSlice.reducer