import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('Requisito 6', () => {
  it('se o card é renderizado com as info corretas', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const { averageWeight, image, name, type } = pokemons[0];
    const { measurementUnit, value } = averageWeight;
    const screenNamePokemon = screen.getByTestId('pokemon-name');
    const screenTypePokemon = screen.getByTestId('pokemon-type');
    const screenWeightPokemon = screen.getByTestId('pokemon-weight');
    const screenImgPokemon = screen.getByAltText(`${name} sprite`);
    expect(screenNamePokemon).toHaveTextContent(name);
    expect(screenTypePokemon).toHaveTextContent(type);
    expect(screenWeightPokemon)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(screenImgPokemon).toHaveAttribute('src', image);
  });
  it('se o card contém um link para mais detalhes', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    const { id } = pokemons[0];
    expect(linkMoreDetails).toHaveAttribute('href', `/pokemons/${id}`);
  });
  it('se ao clicar no link more details o user é redirecionado para details page', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    const { id } = pokemons[0];
    userEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });
  it('se há um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const { name } = pokemons[0];
    const favoriteStar = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteStar).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
