import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author, but does not render url and likes', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'http://test.com',
    likes: 0
  }

  const { container } = render(<Blog blog={blog} updateBlog={() => {}} removeBlog={() => {}} />)

  const span = container.querySelector('.title-author')
  const button = container.querySelector('.button')
  expect(span).toHaveTextContent('Test title Test author')
  expect(button).toHaveTextContent('view')
})