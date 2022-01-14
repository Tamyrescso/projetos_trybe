import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import Filter from './components/Filter';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      cardsSaved: [],
      filteredCards: [],
      filterName: '',
      filterRare: 'todas',
      filterTrunfo: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      if (name === 'filterName' || name === 'filterRare') return this.onFilter();
      if (name === 'filterTrunfo') return this.onFilterTrunfo();
    });
  }

  onSaveButtonClick = () => {
    const newObject = {};
    Object.entries(this.state).map((group) => {
      const [key, value] = group;
      if (key !== 'cardsSaved') {
        newObject[key] = value;
      }
      return newObject;
    });
    this.setState(({ cardsSaved, filteredCards }) => ({
      cardsSaved: [...cardsSaved, newObject],
      filteredCards: [...filteredCards, newObject],
    }));
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
    });
    const { cardTrunfo } = this.state;
    if (cardTrunfo === true) {
      this.setState({ hasTrunfo: true });
    }
  }

  validation = () => {
    const { cardName,
      cardDescription,
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3 } = this.state;

    let inputFilled = false;
    let max90 = false;
    let attrSumMax = false;
    const inputLimit = 90;
    const sumLimit = 210;

    if (cardName.length > 0
      && cardDescription.length > 0
      && cardImage.length > 0) {
      inputFilled = true;
    } else {
      inputFilled = false;
    }

    if ((parseInt(cardAttr1, 10) <= inputLimit && parseInt(cardAttr1, 10) >= 0)
      && (parseInt(cardAttr2, 10) <= inputLimit && parseInt(cardAttr2, 10) >= 0)
      && (parseInt(cardAttr3, 10) <= inputLimit && parseInt(cardAttr3, 10) >= 0)) {
      max90 = true;
    } else {
      max90 = false;
    }

    if (parseInt(cardAttr1, 10)
    + parseInt(cardAttr2, 10)
    + parseInt(cardAttr3, 10) <= sumLimit) {
      attrSumMax = true;
    } else {
      attrSumMax = false;
    }

    if (inputFilled && max90 && attrSumMax) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  onDeleteCard = ({ target }) => {
    const index = target.id;
    const { cardsSaved } = this.state;
    if (cardsSaved[index].cardTrunfo) {
      this.setState({ hasTrunfo: false });
    }
    // Código a seguir feito com ajuda encontrada no link: https://stackoverflow.com/questions/29527385/removing-element-from-array-in-component-state
    this.setState((prevState) => {
      const newArray = prevState.cardsSaved.slice();
      newArray.splice([index], 1);
      return { cardsSaved: newArray, filteredCards: newArray };
    });
  }

  onFilter = () => {
    const { cardsSaved, filterName, filterRare } = this.state;
    let filterByRare = [];
    let filterSet = [];

    if (filterRare !== 'todas') {
      filterByRare = cardsSaved.filter((card) => card.cardRare === filterRare);
    } else {
      filterByRare = [...cardsSaved];
    }

    if (filterName.length > 0) {
      filterSet = filterByRare.filter((card) => card.cardName.includes(filterName));
    } else {
      filterSet = filterByRare;
    }

    this.setState({ filteredCards: [...filterSet] });
  }

  onFilterTrunfo = () => {
    const { cardsSaved, filterTrunfo } = this.state;
    let trunfoCard = [];
    if (cardsSaved.length > 0) {
      trunfoCard = cardsSaved.filter((card) => card.hasTrunfo === false);
    }
    if (filterTrunfo) {
      this.setState({ filteredCards: [...trunfoCard] });
    } else {
      this.setState({ filteredCards: [...cardsSaved] });
    }
  }

  render() {
    const { filteredCards, filterName, filterRare, filterTrunfo } = this.state;
    return (
      <div className="wrapper">
        <h1 className="title">Trunfo in Borderland</h1>
        <div className="top-wrapper">
          <div className="forms">
            <Form
              { ...this.state }
              onInputChange={ this.onInputChange }
              onSaveButtonClick={ this.onSaveButtonClick }
              validation={ this.validation }
            />
          </div>
          <div className="card-preview">
            <Card { ...this.state } />
          </div>
        </div>
        <div className="bottom-wrapper">
          <div className="filter-wrapper">
          <h2>Todas as cartas</h2>
          <Filter
            onInputChange={ this.onInputChange }
            filterName={ filterName }
            filterRare={ filterRare }
            filterTrunfo={ filterTrunfo }
          />
        </div>
          <div className="card-set">
            {filteredCards.length > 0
                && filteredCards.map((card, index) => (
                  <div key={ index } className="div-cards">
                    <Card key={ card.cardName } { ...card } />
                    <button
                      data-testid="delete-button"
                      type="button"
                      id={ index }
                      onClick={ this.onDeleteCard }
                      className="btn-delete"
                    >
                      Excluir
                    </button>
                  </div>
                ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
