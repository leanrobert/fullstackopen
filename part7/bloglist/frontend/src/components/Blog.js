import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentBlog } from '../reducers/blogsReducers'

const Blog = ({ blog, like, remove }) => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) =>  user)
  const [comment, setComment] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(commentBlog(blog.id, comment))
    setComment('')
  }

  if(!blog) {
    return null
  }

  return (
    <div className="blog">
      <h2>{blog.title}</h2>
      <div>
        <div>
          {" "}
          <a href={blog.url}> {blog.url}</a>{" "}
        </div>
        <div>
        {blog.likes} likes <button onClick={like}>like</button>
        </div>
        <div>{blog.user && `added by ${blog.user.name}`}</div>
        <h3>comments</h3>
        <form onSubmit={handleSubmit}>
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            id="comment"
          />
        <button id="create-butto" type="submit">
          add comment
        </button>
      </form>
        <ul>
          {blog.comments.map((comm, i) => (
            <li key={i}>{comm}</li>
          ))}
        </ul>
        {blog.user.username === user.username && <button onClick={remove}>delete</button>}
      </div>
    </div>
  );
};

Blog.propTypes = {
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  canRemove: PropTypes.bool,
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  }),
};

export default Blog;
