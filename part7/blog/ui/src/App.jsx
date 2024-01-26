import { useState, useEffect, useCallback } from 'react'
import { Blog } from './components/Blog'
import { getAll } from './services/blog'
import { Login } from './components/login/Login.jsx'
import { login } from './services/auth.js'
import { AddBlog } from './components/forms/AddBlog.jsx'
import { Notification } from './components/shared/Notification.jsx'
import {useDispatch} from 'react-redux';
import {startNotification} from './redux/reducers/notification.js';

const App = () => {
  const dispatch = useDispatch()
  const initLocalStorage = () => {
    const userJson = window.localStorage.getItem('userDetails')
    if (userJson) {
      return JSON.parse(userJson)
    }
  }
  const [user, setUser] = useState(() => initLocalStorage())
  const [blogs, setBlogs] = useState([])

  const refreshBlogs = useCallback(
    () => {
      getAll(user?.token).then(blogs =>
        setBlogs( blogs ? blogs : [] )
      )
    }, [user]
  )

  useEffect(() => {
    if (user) {
      refreshBlogs()
    }
  }, [user, refreshBlogs])

  const onLogin = async (loginDetails) => {
    const res = await login(loginDetails)
    if (res.success) {
      window.localStorage.setItem('userDetails', JSON.stringify(res))
      setUser(res)
    } else {
      dispatch(startNotification({
          notification: {
            type: 'error',
            message: res.error
          },
          timer: 5000
        }
      ))
    }
  }

  const onLogout = () => {
    window.localStorage.removeItem('userDetails')
    setUser(null)
    setBlogs([])
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification/>
      {!user ? <Login onLogin={onLogin}/> :
        <>
          <p>{`${user.name} logged in`}</p>
          <button onClick={onLogout}>logout</button>

          <AddBlog refreshBlogs={refreshBlogs}/>

          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} refreshBlogs={refreshBlogs}/>
          )}
        </>
      }
    </div>
  )
}

export default App
