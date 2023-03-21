import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createBlog({ title, author, url });
  };

  return (
    <div>
      <Typography variant="h5">Create a new blog</Typography>

      <form onSubmit={handleSubmit}>
        <TextField 
          id="title" 
          label="Title" 
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField 
          id="author" 
          label="Author" 
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField 
          id="url" 
          label="Url" 
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button sx={{ display: 'block'}} type="submit">create</Button>
      </form>
    </div>
  );
};

export default BlogForm;
