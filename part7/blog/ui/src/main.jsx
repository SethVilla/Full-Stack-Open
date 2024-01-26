import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {Provider} from 'react-redux';
import {blogStore} from './redux/store/blog.js';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {AddBlog} from './components/forms/AddBlog.jsx';
import {Blog} from './components/Blog.jsx';
import {UserList} from './components/shared/user/UserList.jsx';
import * as path from 'path';
import {UserBlogList} from './components/shared/user/UserBlogList.jsx';
import {UserContainer} from './components/shared/user/UserContainer.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/createNew',
        element: <AddBlog />,
      },
      {
        path: '/blog/:id',
        element: <Blog />,
      },
      {
        path: '/users',
        element: <UserContainer />,
        children: [
          {
            path: '',
            element: <UserList />,
          },
          {
            path: ':id',
            element: <UserBlogList />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={blogStore}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>,
);
