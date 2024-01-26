import {createSlice} from '@reduxjs/toolkit';
import {
  getAll,
  addBlog as addBlogService,
  onLike,
  onRemove,
} from '../../services/blog.js';
import {startNotification} from './notification.js';

const initialState = [];

export const sortBlogs = state => {
  return [...state].sort((a, b) => b.likes - a.likes);
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    // createAnecdote(state, action) {
    //   const content = action.payload.content
    //   // console.log(JSON.parse(JSON.stringify(state)), "JSON")
    //   state.push({
    //     content,
    //     votes: 0,
    //     id: getId()
    //   })
    //   return sortAnecdotes(state)
    // },
    // vote(state, action) {
    //   const id = action.payload.id
    //   return sortAnecdotes(state.map(anecdote => {
    //     return anecdote.id === id ? {...anecdote, votes: anecdote.votes + 1} : anecdote
    //   }))
    // },
    like(state, action) {
      const id = action.payload.id;
      return sortBlogs(
        state.map(blog => {
          return blog.id === id ? {...blog, likes: blog.likes + 1} : blog;
        }),
      );
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload.id);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const {addBlog, setBlogs, like, removeBlog} = blogSlice.actions;
export const blogReducer = blogSlice.reducer;

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await addBlogService(blog);
    if (newBlog.success) {
      dispatch(
        startNotification({
          notification: {
            type: 'success',
            message: `a new blog ${blog.title} by ${blog.author} added`,
          },
          timer: 5000,
        }),
      );
      dispatch(addBlog(newBlog));
    } else {
      dispatch(
        startNotification({
          notification: {
            type: 'error',
            message: `failed to add new blog ${res.error}`,
          },
          timer: 5000,
        }),
      );
    }
  };
};

export const likeBlog = payload => {
  return async dispatch => {
    const updatedBlog = await onLike(payload);
    dispatch(like(updatedBlog));
  };
};

export const deleteBlog = payload => {
  return async dispatch => {
    const res = await onRemove(payload.id);
    if (res.success) {
      dispatch(removeBlog(payload));
      dispatch(
        startNotification({
          notification: {
            type: 'success',
            message: `${payload.title} has been removed from server`,
          },
          timer: 5000,
        }),
      );
    } else {
      dispatch(
        startNotification({
          notification: {
            type: 'error',
            message: `${payload.title} has already been removed from server`,
          },
          timer: 5000,
        }),
      );
    }
  };
};
