import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmptyState from '../EmptyState';

describe('EmptyState', () => {
  it('renders the empty state messages', () => {
    render(<EmptyState />);

    expect(screen.getByText(/Nenhum post ainda/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Seja o primeiro a compartilhar uma imagem/i)
    ).toBeInTheDocument();
  });
});
