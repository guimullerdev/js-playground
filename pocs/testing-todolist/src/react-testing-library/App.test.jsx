import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';

test('renders with no todos and zero items left', () => {
  render(<App />);
  expect(screen.getByText('0 item(s) left')).toBeInTheDocument();
});

test('adds a new todo', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.type(screen.getByLabelText('New todo'), 'Buy milk');
  await user.click(screen.getByRole('button', { name: 'Add' }));

  expect(screen.getByText('Buy milk')).toBeInTheDocument();
  expect(screen.getByText('1 item(s) left')).toBeInTheDocument();
});

test('does not add an empty todo', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: 'Add' }));

  expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
});

test('toggles a todo as done', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.type(screen.getByLabelText('New todo'), 'Buy milk');
  await user.click(screen.getByRole('button', { name: 'Add' }));

  const checkbox = screen.getByRole('checkbox');
  await user.click(checkbox);

  expect(checkbox).toBeChecked();
  expect(screen.getByText('0 item(s) left')).toBeInTheDocument();
});

test('deletes a todo', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.type(screen.getByLabelText('New todo'), 'Buy milk');
  await user.click(screen.getByRole('button', { name: 'Add' }));
  await user.click(screen.getByRole('button', { name: 'Delete Buy milk' }));

  expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();
});
