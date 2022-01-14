import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

function checkPokemonsFilteredByType(...pokemonsByType) {
  pokemonsByType.forEach((pokemon) => {
    const pokemonTypeText = screen.getByTestId('pokemon-type');
    expect(pokemonTypeText).toHaveTextContent(new RegExp(pokemon.type, 'i'));
    const btnNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    if (pokemonsByType.length > 0) {
      userEvent.click(btnNextPokemon);
    } else {
      expect(btnNextPokemon).toBeDisabled();
    }
  });
}

export default checkPokemonsFilteredByType;
