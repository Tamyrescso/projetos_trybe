import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';
import checkPokemonsFilteredByType from './helper';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};
describe('Requisito 5', () => {
  it('se há um heading h2 com Encountered pokémons', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const headingEncounteredPokemons = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(headingEncounteredPokemons).toBeInTheDocument();
  });
  it(`se é exibido o próximo pokémon quando clica no botão com essa função
    e volta para o início depois do último pokémon`, () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const btnNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(btnNextPokemon).toBeInTheDocument();
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(new RegExp(pokemon.name, 'i'))).toBeInTheDocument();
      userEvent.click(btnNextPokemon);
    });
    const pikachuCard = screen.getByText(/pikachu/i);
    expect(pikachuCard).toBeInTheDocument();
  });
  it('se é exibido somente um pokémon por vez', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    pokemons.forEach((pokemon) => {
      if (pokemon.name !== 'Pikachu') {
        expect(screen.queryByText(new RegExp(pokemon.name, 'i'))).not.toBeInTheDocument();
      }
    });
    const pikachuCard = screen.getByText(/pikachu/i);
    expect(pikachuCard).toBeInTheDocument();
  });
  it('se os botões de filtro funcionam de maneira esperada e estão na tela', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const buttonsByTestId = screen.getAllByTestId('pokemon-type-button');
    const filterButtonsNames = [
      'all',
      'electric',
      'fire',
      'bug',
      'poison',
      'psychic',
      'normal',
      'dragon',
    ];
    expect(buttonsByTestId).toHaveLength(filterButtonsNames.length - 1);
    filterButtonsNames.forEach((buttonName) => {
      const button = screen.getByRole('button',
        { name: new RegExp(buttonName, 'i') });
      expect(button).toBeInTheDocument();
      if (buttonName !== 'all') {
        userEvent.click(button);
        const pokemonsByType = (
          pokemons.filter((pokemon) => pokemon.type === new RegExp(buttonName, 'i'))
        );
        checkPokemonsFilteredByType([...pokemonsByType]);
      }
    });
  });
  it('se o botão All reseta os filtros', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const btnAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(btnAll).toBeInTheDocument();
    const btnNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(new RegExp(pokemon.name, 'i'))).toBeInTheDocument();
      userEvent.click(btnNextPokemon);
    });
    const btnFire = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(btnFire);
    userEvent.click(btnAll);
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(new RegExp(pokemon.name, 'i'))).toBeInTheDocument();
      userEvent.click(btnNextPokemon);
    });
  });
});
