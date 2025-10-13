import { render, screen } from '@testing-library/react';
import { Logo } from '../components/Onboarding/Logo';
import { describe, expect, it } from 'vitest';

describe('Logo component', () => {
  it('should render the link and ensure it points to the project website', () => {
    render(<Logo />);

    const linkElement = screen.getByRole('link');
    expect(linkElement.getAttribute('href')).toBe('https://example.com');
    expect(linkElement.getAttribute('target')).toBe('_blank');
  });
});
