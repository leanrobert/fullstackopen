import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('when button is clicked, url and likes are shown', async () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'http://test.com',
    likes: 0,
    user: {
      name: 'Leandro',
      username: 'lrobert',
      token: '1234'
    }
  }

  const { container } = render(<Blog blog={blog} updateBlog={() => {}} removeBlog={() => {}} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = container.querySelector('.notshowed')
  expect(url).toBeDefined()
})