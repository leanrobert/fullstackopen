import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = e => {
    e.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input type='text' name='Title' placeholder='title' value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        author:
        <input type='text' name='Author' placeholder='author' value={author} onChange={e => setAuthor(e.target.value)} />
      </div>
      <div>
        url:
        <input type='text' name='Url' placeholder='url' value={url} onChange={e => setUrl(e.target.value)} />
      </div>
      <button type='submit' className='create-button'>create</button>
    </form>
  )
}

CreateBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default CreateBlog