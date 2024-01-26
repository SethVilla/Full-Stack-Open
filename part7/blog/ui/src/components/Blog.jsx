import {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {deleteBlog, likeBlog} from '../redux/reducers/blog.js';

export const Blog = ({blog}) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const onLikeClick = async (id, likes) => {
    dispatch(likeBlog({id, likes: likes + 1}));
  };

  const onRemoveClick = async blog => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      dispatch(deleteBlog(blog));
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      <p>
        {blog.title} {blog.author}
      </p>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && (
        <>
          <p>{blog.url}</p>
          <div>
            <p>{`likes: ${blog.likes}`}</p>
            <button onClick={() => onLikeClick(blog.id, blog.likes)}>
              like
            </button>
          </div>
          <p>{blog.url}</p>
          <p>{`added by: ${blog.user.name}`}</p>
          <button onClick={() => onRemoveClick(blog)}>remove</button>
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    author: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }),
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onNotification: PropTypes.func.isRequired,
};
