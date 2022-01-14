import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 1', () => {
  it('Testa se a página home contém os links Home, About e Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    const linkFavorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });
  it('se ao clicar no link Home o user é redirecionado para a página de URL /',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkHome = screen.getByRole('link', {
        name: /home/i,
      });
      userEvent.click(linkHome);
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });
  it('se ao clicar no link About o user é redirecionado para a página de URL /about',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkAbout = screen.getByRole('link', {
        name: /about/i,
      });
      userEvent.click(linkAbout);
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });
  it('se ao clicar no link Favorite o user é redirecionado para a pág de URL /favorites',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkFavorite = screen.getByRole('link', {
        name: /favorite pokémons/i,
      });
      userEvent.click(linkFavorite);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });
  it('se a URL não existe, renderiza a página NOT Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const pageNotFound = screen.getByRole('heading', {
      name: /page requested not found Crying emoji/i,
      level: 2,
    });
    expect(pageNotFound).toBeInTheDocument();
  });
});
