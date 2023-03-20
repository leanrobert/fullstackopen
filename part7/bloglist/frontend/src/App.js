import { useEffect, useRef } from 'react';
import Blog from './components/Blog';

import LoginForm from './components/Login';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createBlogRed, deleteBlog, initializeBlogs, voteBlog } from './reducers/blogsReducers';
import { loginUser, logoutUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ user }) => user)
  const info = useSelector(({ notification }) => notification)
  const blogs = useSelector(({ blogs }) => blogs)

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  const notifyWith = (message, type = 'info') => {
    dispatch(setNotification({ message, type }))
  };

  const login = async (username, password) => {
    try {
      dispatch(loginUser(username, password))
      notifyWith('welcome!');
    } catch (e) {
      notifyWith('wrong username or password', 'error');
    }
  };

  const logout = async () => {
    dispatch(logoutUser())
    notifyWith('logged out');
  };

  const createBlog = async (newBlog) => {
    dispatch(createBlogRed(newBlog))
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`);
    blogFormRef.current.toggleVisibility();
  };

  const like = async (blog) => {
    dispatch(voteBlog(blog))
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`);
  };

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    );
    if (ok) {
      dispatch(deleteBlog(blog))
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`);
    }
  };

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification info={info} />
        <LoginForm login={login} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user?.username === user.username}
            remove={() => remove(blog)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
