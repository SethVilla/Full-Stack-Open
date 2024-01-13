import {useState} from 'react'
import {onLike, onRemove} from "../services/blog.js";
import PropTypes from 'prop-types'
export const Blog = ({ blog, onNotification, refreshBlogs }) => {
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
                onNotification("success", `${blog.title} has been removed from server`)
            } else {
                onNotification("error", `${blog.title} has already been removed from server`)
            }
        }
    }

    return <div style={blogStyle}>
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
