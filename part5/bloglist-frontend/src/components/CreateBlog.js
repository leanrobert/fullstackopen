import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

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
            <input type="text" name="Title" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
            author:
            <input type="text" name="Author" value={author} onChange={e => setAuthor(e.target.value)} />
        </div>
        <div>
            url:
            <input type="text" name="Url" value={url} onChange={e => setUrl(e.target.value)} />
        </div>
        <button type="submit">create</button>
    </form>
  )
}

export default CreateBlog