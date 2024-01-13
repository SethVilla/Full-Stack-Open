import { useState, useEffect, useCallback } from 'react'
import { Blog } from './components/Blog'
import { getAll } from './services/blog'
import { Login } from './components/login/Login.jsx'
import { login } from './services/auth.js'
import { AddBlog } from './components/forms/AddBlog.jsx'
import { Notification } from './components/shared/Notification.jsx'

const App = () => {
  const [notification, setNotification] = useState({
    type: '',
    message: null
  })

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
      setNotification({
        type: 'error',
        message: res.error
      })
      setTimeout(() => {
        setNotification({ type: '', message: null })
      }, 3000)
    }
  }

  const onLogout = () => {
    window.localStorage.removeItem('userDetails')
    setUser(null)
    setBlogs([])
  }

  const onNotification = (type, message) => {
    setNotification({
      type,
      message
    })
    setTimeout(() => {
      setNotification({ type: '', message: null })
    }, 3000)
  }

  return (
    <div>
      <h1>Blogs</h1>
      {notification.message && <Notification notification={notification}/>}
      {!user ? <Login onLogin={onLogin}/> :
        <>
          <p>{`${user.name} logged in`}</p>
          <button onClick={onLogout}>logout</button>

          <AddBlog onNotification={onNotification} refreshBlogs={refreshBlogs}/>

          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} onNotification={onNotification} refreshBlogs={refreshBlogs}/>
          )}
        </>
      }
    </div>
  )
}

export default App
