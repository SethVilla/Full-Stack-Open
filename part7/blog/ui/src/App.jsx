import {useState, useEffect, useCallback} from 'react';
import {Blog} from './components/Blog';
import {Login} from './components/login/Login.jsx';
import {login} from './services/auth.js';
import {AddBlog} from './components/forms/AddBlog.jsx';
import {Notification} from './components/shared/Notification.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {startNotification} from './redux/reducers/notification.js';
import {initializeBlogs, setBlogs} from './redux/reducers/blog.js';
import {removeUser, setUser} from './redux/reducers/user.js';
import {Outlet} from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);

  const refreshBlogs = useCallback(() => {
    dispatch(initializeBlogs());
  }, [user]);

  useEffect(() => {
    if (user) {
      refreshBlogs();
    }
  }, [user, refreshBlogs]);

  const onLogin = async loginDetails => {
    const res = await login(loginDetails);
    if (res.success) {
      window.localStorage.setItem('userDetails', JSON.stringify(res));
      dispatch(setUser(res));
    } else {
      dispatch(
        startNotification({
          notification: {
            type: 'error',
            message: res.error,
          },
          timer: 5000,
        }),
      );
    }
  };

  const onLogout = () => {
    window.localStorage.removeItem('userDetails');
    dispatch(removeUser());
    dispatch(setBlogs([]));
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <Outlet />
      {/*{!user ? (*/}
      {/*  <Login onLogin={onLogin} />*/}
      {/*) : (*/}
      {/*  <>*/}
      {/*    <p>{`${user.name} logged in`}</p>*/}
      {/*    <button onClick={onLogout}>logout</button>*/}

      {/*    <AddBlog />*/}

      {/*    <h2>blogs</h2>*/}
      {/*    {blogs.map(blog => (*/}
      {/*      <Blog key={blog.id} blog={blog} />*/}
      {/*    ))}*/}
      {/*  </>*/}
      {/*)}*/}
    </div>
  );
};

export default App;
