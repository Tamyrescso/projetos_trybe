import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Requisito 2', () => {
  it('se na página about há um heading About Pokédex', () => {
    renderWithRouter(<About />);
    const headingPokedex = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(headingPokedex).toBeInTheDocument();
  });
  it('se na página about há dois parágrafos de info sobre Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph1 = screen.getByText(
      /this application simulates a pokédex/i,
    );
    const paragraph2 = screen.getByText(
      /one can filter pokémons by type, and see more details for each one of them/i,
    );
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
  it('se na página about há uma imagem da Pokédex', () => {
    renderWithRouter(<About />);
    const imgPokedex = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(imgPokedex).toBeInTheDocument();
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
