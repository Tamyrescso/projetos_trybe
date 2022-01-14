import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from '../components/Card';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      artist: '',
      renderLoading: false,
      albums: [],
      albumsNotFound: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    if (value.length > 1) {
      return this.setState({ artist: value, disabled: false });
    }
    return this.setState({ disabled: true });
  }

  handleClick = () => {
    const { artist } = this.state;
    this.setState({ renderLoading: true }, () => searchAlbumsAPI(artist)
      .then((result) => {
        if (result.length === 0) {
          this.setState({
            albumsNotFound: true,
            albums: [],
            disabled: true,
            renderLoading: false,
          });
        } else {
          this.setState({
            renderLoading: false,
            disabled: true,
            albums: [...result],
            albumsNotFound: false,
          });
        }
      }));
  }

  render() {
    const { disabled, albums, renderLoading, artist, albumsNotFound } = this.state;
    const albunsByArtist = (
      <div>
        <p>
          {`Resultado de álbuns de: 
          ${artist}`}
        </p>
        {albums.map((album) => <Card key={ album.collectionId } album={ album } />)}
      </div>);
    return (
      <div data-testid="page-search">
        <Header />
        {renderLoading
          ? <Loading />
          : (
            <form>
              <input
                data-testid="search-artist-input"
                type="text"
                placeholder="Nome do artista"
                onChange={ this.handleChange }
              />
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ disabled }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </form>
          )}
        {albums.length > 0 && albunsByArtist}
        {albumsNotFound && <p>Nenhum álbum foi encontrado</p>}
      </div>
    );
  }
}

export default Search;
