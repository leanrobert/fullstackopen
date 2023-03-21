import { Button, List, ListItem, TextField, Typography } from "@mui/material";
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
      <Typography variant="h4">{blog.title}</Typography>
      <div>
        <Typography>
          <a href={blog.url}> {blog.url}</a>
        </Typography>
        <Typography>
        {blog.likes} likes <Button variant="outlined" size="small" onClick={like}>like</Button>
        </Typography>
        <Typography>{blog.user && `added by ${blog.user.name}`}</Typography>
        <Typography variant="h4">comments</Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            id="comment" 
            label="Comment" 
            value={comment}
            size="small"
            onChange={({ target }) => setComment(target.value)}
          />
        <Button sx={{ display: 'block' }} id="create-butto" type="submit">
          add comment
        </Button>
      </form>
        <List dense={false}>
          {blog.comments.map((comm, i) => (
            <ListItem key={i}>
              {comm}
            </ListItem>
          ))}
        </List>
        {blog.user.username === user.username && <Button color="error" variant="outlined" onClick={remove}>delete</Button>}
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
