import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('show JankenGame Title', () => {
  const { queryByText } = render(<App />);
  const titleElement = queryByText('Janken Game');

  expect(titleElement).toBeInTheDocument();
});
