import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      renderLoading: true,
      isFavorite: false,
    };
  }

  componentDidMount() {
    this.handleInitialization();
  }

  handleInitialization = () => {
    getFavoriteSongs()
      .then((result) => this.setState({ favorites: result, renderLoading: false }))
      .then(() => this.setState({ isFavorite: true }));
  }

  shouldComponentUpdate = (_nextProps, { isFavorite }) => {
    if (isFavorite === false) {
      return true;
    }
    return false;
  }

  handleRemoveFavorite = () => {
    this.setState({ isFavorite: false, renderLoading: true });
  }

  componentDidUpdate = () => {
    this.handleInitialization();
  }

  render() {
    const { renderLoading, favorites, isFavorite } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {renderLoading
          ? <Loading />
          : (
            favorites.map((song, index) => (
              <MusicCard
                key={ song.trackId }
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
                trackId={ song.trackId }
                index={ index }
                songObj={ song }
                favorites={ favorites }
                handleRemoveFavorite={ this.handleRemoveFavorite }
                isFavorite={ isFavorite }
              />
            ))
          )}
      </div>
    );
  }
}

export default Favorites;
