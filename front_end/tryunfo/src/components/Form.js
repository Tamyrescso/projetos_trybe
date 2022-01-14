import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
  }

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
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
      validation } = this.props;
    return (
      <form onSubmit={ this.handleSubmit }>
        <h2>Crie sua carta</h2>
        <label htmlFor="name">
          Nome da carta
        </label>
        <input
          value={ cardName }
          onChange={ onInputChange }
          onKeyUp={ validation }
          className="name"
          name="cardName"
          type="text"
          data-testid="name-input"
        />
        <label htmlFor="description">
          Descrição
        </label>
        <textarea
          value={ cardDescription }
          onChange={ onInputChange }
          onKeyUp={ validation }
          className="description"
          name="cardDescription"
          data-testid="description-input"
          maxLength="65"
        />
        <div className="attrs">
          <div className="attr-label">
            <label htmlFor="attr1">
              Força
            </label>
            <label htmlFor="attr1">
              Inteligência
            </label>
            <label htmlFor="attr1">
              Agilidade
            </label>
          </div>
          <div className="attr-input">
            <input
              value={ cardAttr1 }
              onChange={ onInputChange }
              onKeyUp={ validation }
              className="attr1"
              name="cardAttr1"
              type="number"
              data-testid="attr1-input"
            />
            <input
              value={ cardAttr2 }
              onChange={ onInputChange }
              onKeyUp={ validation }
              className="attr2"
              name="cardAttr2"
              type="number"
              data-testid="attr2-input"
            />
            <input
              value={ cardAttr3 }
              onChange={ onInputChange }
              onKeyUp={ validation }
              className="attr3"
              name="cardAttr3"
              type="number"
              data-testid="attr3-input"
            />
          </div>
        </div>
        <div className="image-div">
          <label htmlFor="image">
            Imagem
          </label>
          <input
            value={ cardImage }
            onChange={ onInputChange }
            onKeyUp={ validation }
            className="image"
            name="cardImage"
            type="text"
            data-testid="image-input"
          />
        </div>
        <label htmlFor="rare">
          Raridade
        </label>
        <select
          value={ cardRare }
          onChange={ onInputChange }
          className="rare"
          name="cardRare"
          data-testid="rare-input"
        >
          <option>normal</option>
          <option>raro</option>
          <option>muito raro</option>
        </select>
        {
          (hasTrunfo
            ? <p data-testid="trunfo-input">Você já tem um Super Trunfo em seu baralho</p>
            : (
              <div className="trunfo-div">
                <><label htmlFor="trunfo">
                  Super trunfo
                </label><input
                    checked={cardTrunfo}
                    onChange={onInputChange}
                    type="checkbox"
                    className="trunfo"
                    name="cardTrunfo"
                    data-testid="trunfo-input" /></>
              </div>
            )
          )
        }
        <button
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
          onMouseOver={ validation }
          onFocus={ validation }
          className="btn-save"
          type="submit"
          data-testid="save-button"
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
  validation: PropTypes.func,
};

Form.defaultProps = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '',
  cardAttr2: '',
  cardAttr3: '',
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
  onInputChange: () => {},
  onSaveButtonClick: () => {},
  validation: () => {},
};

export default Form;
