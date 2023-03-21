import { useEffect, useRef } from 'react';

import LoginForm from './components/Login';
import Notification from './components/Notification';

import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createBlogRed, deleteBlog, initializeBlogs, voteBlog } from './reducers/blogsReducers';
import { getUser, loginUser } from './reducers/userReducer';
import { Route, Routes, useMatch } from 'react-router-dom';
import UsersData from './components/UsersData';
import CreationPage from './components/CreationPage';
import { initializeUsers } from './reducers/usersReducer';
import UserDetail from './components/UserDetail';
import Blog from './components/Blog';
import Menu from './components/Menu';

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ user }) => user)
  const info = useSelector(({ notification }) => notification)
  const blogs = useSelector(({ blogs }) => blogs)
  const users = useSelector(({ users }) => users)

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

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

  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')

  const userFiltered = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

    const blogFiltered = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

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
      <Menu />
      <h2>blogs</h2>
      <Notification />
      <Routes>
        <Route path='/blogs/:id' element={
          <Blog 
            blog={blogFiltered} 
            like={() => like(blogFiltered)} 
            remove={() => remove(blogFiltered)} 
          />
        } />
        <Route path="/users/:id" element={<UserDetail user={userFiltered} />} />
        <Route path="/users" element={<UsersData users={users} />} />
        <Route path="/" element={<CreationPage blogFormRef={blogFormRef} createBlog={createBlog} blogs={blogs} like={like} user={user} remove={remove} />} />
      </Routes>
    </div>
  );
};

export default App;
