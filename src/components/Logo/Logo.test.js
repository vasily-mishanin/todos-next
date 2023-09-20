import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

test('Logo renders without crashing', () => {
  render(<Logo />);
  // const linkElement = screen.getByText(/learn react/i);
  // const LogoSpanText = screen.getByText('TodosNext');
  // expect(LogoSpanText).toBeInTheDocument();
});

test('Logo has text inside', () => {
  render(<Logo />);
  const logoSpan = screen.getByText('TodosNext');
  expect(logoSpan.textContent).toBe('TodosNext');
});

test('Logo has image inside', () => {
  render(<Logo />);
  const logoImage = screen.getByAltText('todos logo');
  expect(logoImage).toBeInTheDocument();
});
