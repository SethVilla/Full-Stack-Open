import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {Blog} from '../../components/Blog.jsx';
import userEvent from '@testing-library/user-event';

test('renders content', () => {
  const blog = {
    author: 'Test Author',
    id: '1',
    likes: 3,
    url: 'test-url',
    title: 'Test Title',
    user: {
      username: 'Test User',
      name: 'Test User Name',
      id: '1',
    },
  };

  render(
    <Blog
      blog={blog}
      onLike={() => {}}
      onRemove={() => {}}
      onNotification={() => {}}
    />,
  );

  const element = screen.getByText(/Test Title/);
  expect(element).toBeDefined();
});
