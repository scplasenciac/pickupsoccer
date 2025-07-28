import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Pickup Soccer App', () => {
  render(<App />);
  const appElement = screen.getByText(/Partidos Cercanos/i);
  expect(appElement).toBeInTheDocument();
});
