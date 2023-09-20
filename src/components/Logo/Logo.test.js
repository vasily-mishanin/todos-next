import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

test('Logo renders without crashing', () => {
  render(<Logo />);
  //const linkElement = screen.getByText(/learn react/i);
  // const LogoSpanText = screen.getByText('TodosNext');
  // expect(LogoSpanText).toBeInTheDocument();
});
