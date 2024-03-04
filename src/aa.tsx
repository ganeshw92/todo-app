import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';

describe('TodoApp', () => {
  test('renders todo app', () => {
    render(
      <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
    );
    reportWebVitals();
  });

  // test('Adds new todo item', () => {
  //   const { getByTestId, getByText } = render
  // });
});
