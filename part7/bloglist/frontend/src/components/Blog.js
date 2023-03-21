import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Blog = ({ blog, like, remove }) => {
  const user = useSelector(({ user }) =>  user)

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
