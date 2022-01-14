import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Requisito 4', () => {
  it('se na page Not Found há um heading: Page requestes not found', () => {
    renderWithRouter(<NotFound />);
    const pageNotFound = screen.getByRole('heading', {
      name: /page requested not found Crying emoji/i,
      level: 2,
    });
    expect(pageNotFound).toBeInTheDocument();
  });
  it('se na page Not Found há o gif do pikachu', () => {
    renderWithRouter(<NotFound />);
    const imgPikachu = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(imgPikachu).toBeInTheDocument();
    expect(imgPikachu).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
