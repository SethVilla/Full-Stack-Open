import { useState } from 'react'
import { addBlog } from '../../services/blog.js'
import {startNotification} from '../../redux/reducers/notification.js';
import {useDispatch} from 'react-redux';
export const AddBlog = ({refreshBlogs }) => {
  const dispatch = useDispatch()
  const [blog, setBlog] = useState({
    author: '',
    title: '',
    url: ''
  })

  const [showForm, setShowForm] = useState(false)

  const onShowForm = () => {
    setShowForm(!showForm)
  }

  const onInputChange = ({ target: { name, value } }) => {
    console.log(name, value)
    setBlog(prevState => ({ ...prevState, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await addBlog(blog)
    if (res.success) {
      dispatch(startNotification({
          notification: {
            type: 'success',
            message: `a new blog ${blog.title} by ${blog.author} added`
          },
          timer: 5000
        }
      ))
      refreshBlogs()
    } else {
      dispatch(startNotification({
          notification: {
            type: 'error',
            message: `failed to add new blog ${res.error}`
          },
          timer: 5000
        }
      ))
    }
  }

  return <>
    {!showForm ?
      <button onClick={onShowForm}>add blog</button> :
      <>
        <h2>Create New</h2>
        <form onSubmit={onSubmit}>
          <div>
                    title:
            <input
              type="text"
              value={blog?.title}
              name="title"
              onChange={onInputChange}
            />
          </div>
          <div>
                    author:
            <input
              type="text"
              value={blog?.author}
              name="author"
              onChange={onInputChange}
            />
          </div>
          <div>
                    url:
            <input
              type="text"
              value={blog?.url}
              name="url"
              onChange={onInputChange}
            />
          </div>
          <button type="submit">create</button>
          <button type="button" onClick={onShowForm}>cancel</button>
        </form>
      </>
    }
  </>
}