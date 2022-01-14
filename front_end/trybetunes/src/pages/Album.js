import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      artworkUrl100: '',
      collectionName: '',
      artistName: '',
      renderLoading: true,
      favorites: [],
    };
  }

  componentDidMount() {
    this.handleInitialization();
  }

  handleInitialization = () => {
    const { match: { params: { id } } } = this.props;
    getFavoriteSongs()
      .then((result) => this.setState({ favorites: result }))
      .then(() => getMusics(id))
      .then((result) => {
        this.setState({
          songs: [...result.slice(1)],
          artworkUrl100: result[0].artworkUrl100,
          collectionName: result[0].collectionName,
          artistName: result[0].artistName,
          renderLoading: false,
        });
      });
  }

  render() {
    const { songs,
      artworkUrl100,
      collectionName,
      artistName,
      renderLoading, favorites } = this.state;
    const renderSongs = (
      <div>
        {songs.map((song, index) => (
          <MusicCard
            key={ song.trackId }
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
            trackId={ song.trackId }
            index={ index }
            songObj={ song }
            favorites={ favorites }
            parent="Album"
          />
        ))}
      </div>
    );
    return (
      <div data-testid="page-album">
        <Header />
        {renderLoading
          ? <Loading />
          : (
            <div>
              <img src={ artworkUrl100 } alt="" />
              <h4 data-testid="artist-name">{artistName}</h4>
              <h3 data-testid="album-name">{collectionName}</h3>
              {renderSongs}
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Album.defaultProps = {
  match: {
    params: {
      id: '',
    },
  },
};

export default Album;
