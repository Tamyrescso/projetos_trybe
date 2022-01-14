import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCotation, saveCurrencies } from '../actions';
import Input from './Input';
import Select from './Select';

const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const METHOD_PAYMENT = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

class FormExpense extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      currency: 'USD',
      method: METHOD_PAYMENT[0],
      tag: TAGS[0],
      description: '',
      id: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    const requestAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseJson = await requestAPI.json();
    const filteredCurrencies = Object.keys(responseJson)
      .filter((currency) => currency !== 'USDT');
    const { saveCurrenciesList } = this.props;
    saveCurrenciesList(filteredCurrencies);
  }

  handleChange({ target }) {
    const { name, value } = target;
    const { storeExpenses } = this.props;
    if (storeExpenses.length >= 1) {
      this.setState({ [name]: value, id: storeExpenses.length });
    }
    this.setState({ [name]: value });
  }

  handleClick() {
    const { expense } = this.props;
    const { value, currency, method, tag, description, id } = this.state;
    expense({ value, currency, method, tag, description, id });
    this.setState({
      value: 0,
      currency: 'USD',
      method: METHOD_PAYMENT[0],
      tag: TAGS[0],
      description: '',
    });
  }

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
    return (
      <div className="px-6 mt-6">
        <Input
          label="Valor:"
          type="text"
          onChange={ this.handleChange }
          value={ value }
          name="value"
          testid="value-input"
        />
        <Select
          label="Moeda:"
          name="currency"
          onChange={ this.handleChange }
          testid="currency-input"
          id="currency"
          values={ currencies }
        />
        <Select
          label="Método de pagamento:"
          name="method"
          onChange={ this.handleChange }
          testid="method-input"
          id="method"
          values={ METHOD_PAYMENT }
        />
        <Select
          label="Tag:"
          name="tag"
          onChange={ this.handleChange }
          testid="tag-input"
          id="tag"
          values={ TAGS }
        />
        <Input
          label="Descrição:"
          type="text"
          onChange={ this.handleChange }
          value={ description }
          name="description"
          testid="description-input"
        />
        <button className="rounded border bg-gray-500 px-4 text-white hover:scale-75" type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  expense: (state) => dispatch(fetchCotation(state)),
  saveCurrenciesList: (currenciesArray) => dispatch(saveCurrencies(currenciesArray)),
});

const mapStateToProps = (state) => ({
  storeExpenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

FormExpense.propTypes = {
  expense: PropTypes.func.isRequired,
  storeExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveCurrenciesList: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormExpense);
