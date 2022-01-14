import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requisito 7', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.queryByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);
  });
  it('se as infos detalhadas do pokémon aparecem na tela', () => {
    const headingDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    const linkMoreDetails = screen.queryByRole('link', {
      name: /more details/i,
    });
    const headingSummary = screen.getByRole('heading', {
      name: /summary/i,
    });
    const summaryParagraph = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity/i,
    );
    expect(headingDetails).toHaveTextContent(`${pokemons[0].name} Details`);
    expect(linkMoreDetails).not.toBeInTheDocument();
    expect(headingSummary).toHaveTextContent('Summary');
    expect(summaryParagraph).toBeInTheDocument();
  });
  it('se há uma seção com as infos de localização do pokémon', () => {
    const pokemonLocations = pokemons[0].foundAt;
    const headingLocations = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    const locationsByAltText = screen.getAllByAltText(
      new RegExp(`${pokemons[0].name} location`, 'i'),
    );

    expect(headingLocations).toHaveTextContent(`Game Locations of ${pokemons[0].name}`);
    pokemonLocations.forEach((obj, index) => {
      const pokemonLocationName = screen.getByText(new RegExp(obj.location, 'i'));
      expect(pokemonLocationName).toBeInTheDocument();
      expect(locationsByAltText[index]).toBeInTheDocument();
      expect(locationsByAltText[index]).toHaveAttribute('src', obj.map);
    });
  });
  it('se o usuário consegue favoritar e desfavoritar na pág de detalhes', () => {
    const inputFavorite = screen.getByLabelText(/pokémon favoritado\?/i);
    userEvent.click(inputFavorite);
    const starFavorite = screen.queryByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(inputFavorite).toBeInTheDocument();
    expect(starFavorite).toBeInTheDocument();
    userEvent.click(inputFavorite);
    expect(starFavorite).not.toBeInTheDocument();
  });
});
