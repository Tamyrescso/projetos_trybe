import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactStars from 'react-rating-stars-component';

class Rating extends Component {
  render() {
    const { email, rating, comment } = this.props;
    return (
      <div>
        <div>
          <p>{email}</p>
          <ReactStars
            count={ 5 }
            size={ 24 }
            activeColor="#ffd700"
            value={ rating }
            edit={ false }
          />
        </div>
        <p>{ comment }</p>
      </div>
    );
  }
}

Rating.propTypes = {
  comment: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default Rating;
