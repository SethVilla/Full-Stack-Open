import {useState} from 'react'
import {onLike, onRemove} from "../services/blog.js";
import PropTypes from 'prop-types'
import {startNotification} from '../redux/reducers/notification.js';
import {useDispatch} from "react-redux";

export const Blog = ({ blog, refreshBlogs }) => {
  const dispatch = useDispatch()
    const [showDetails, setShowDetails] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const onLikeClick = async (id, likes) => {
        const res = await onLike(id, likes + 1)
        if (res.success) {
            refreshBlogs()
        }

    }

    const onRemoveClick = async (id) => {
        if(window.confirm(`Delete ${blog.title}?`)) {
            const res = await onRemove(id)
            if (res.success) {
                refreshBlogs()
              dispatch(startNotification(
                {
                  notification : {
                    type: "success",
                    message: `${blog.title} has been removed from server`
                  },
                  timer: 5000
                }
              ))
            } else {
              dispatch(startNotification(
                {
                  notification: {
                    type: "error",
                    message: `${blog.title} has already been removed from server`
                  },
                  timer: 5000
                }
              ))
            }
        }
    }

    return <div className="blog" style={blogStyle}>
            <p>{blog.title} {blog.author}</p>
            <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
            {showDetails && <>
                <p>{blog.url}</p>
                <div>
                    <p>{`likes: ${blog.likes}`}</p>
                    <button onClick={() => onLikeClick(blog.id, blog.likes)}>like</button>
                </div>
                <p>{blog.url}</p>
                <p>{`added by: ${blog.user.name}`}</p>
                <button onClick={() => onRemoveClick(blog.id)}>remove</button>
            </>}
    </div>
}

Blog.propTypes = {
    blog: PropTypes.shape(
        {
            author: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            likes: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            user: PropTypes.shape({
                username: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                id: PropTypes.string.isRequired,
            }).isRequired
        }
    ),
    onLike: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onNotification: PropTypes.func.isRequired
}
