import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
    } = this.props;
    return (
      <div className="card">
        <div className="icons-left">
          <span>
            <p>7</p>
            <i class="bi bi-suit-heart-fill"></i>
          </span>
          <span className="rotate">
            <p>7</p>
            <i class="bi bi-suit-diamond-fill"></i>
          </span>
        </div>
        <div className="card-content">
            <h1 data-testid="name-card">
              {cardName.length > 0 && cardName}
            </h1>
          <img src={ cardImage } alt={ cardName } data-testid="image-card" />
          <p className="description" data-testid="description-card">{cardDescription}</p>
          <div className="attr-wrapper">
            <ul data-testid="attr1-card">
              Força
              <li>{cardAttr1}</li>
            </ul>
            <ul data-testid="attr2-card">
              Inteligência
              <li>{cardAttr2}</li>
            </ul>
            <ul data-testid="attr3-card">
              Agilidade
              <li>{cardAttr3}</li>
            </ul>
          </div>
          <p className="rare-card" data-testid="rare-card">Esse personagem é {cardRare}</p>
          {!hasTrunfo && cardTrunfo && <h3 data-testid="trunfo-card" className="trunfo-card">
            Super Trunfo
          </h3>}
        </div>
        <div className="icons-right">
          <span>
            <p>7</p>
            <i class="bi bi-suit-club-fill"></i>
          </span>
          <span className="rotate">
            <p>7</p>
            <i class="bi bi-suit-spade-fill"></i>
          </span>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
};

Card.defaultProps = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '',
  cardAttr2: '',
  cardAttr3: '',
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  hasTrunfo: false,
};

export default Card;
