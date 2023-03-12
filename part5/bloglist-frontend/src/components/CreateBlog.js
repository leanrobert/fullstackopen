import React from 'react'

const CreateBlog = ({ title, author, url, setA, setT, setU, handleCreateBlog }) => {
  return (
    <form onSubmit={handleCreateBlog}>
        <div>
            title:
            <input type="text" name="Title" value={title} onChange={setT} />
        </div>
        <div>
            author:
            <input type="text" name="Author" value={author} onChange={setA} />
        </div>
        <div>
            url:
            <input type="text" name="Url" value={url} onChange={setU} />
        </div>
        <button type="submit">create</button>
    </form>
  )
}

export default CreateBlog