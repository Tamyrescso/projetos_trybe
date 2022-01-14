import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEditExpense } from '../actions';
import Input from './Input';
import Select from './Select';

const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const METHOD_PAYMENT = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

class EditExpense extends React.Component {
  constructor(props) {
    super(props);
    const { expenseEdit } = props;
    this.state = {
      value: expenseEdit[0].value,
      currency: expenseEdit[0].currency,
      method: expenseEdit[0].method,
      tag: expenseEdit[0].tag,
      description: expenseEdit[0].description,
      id: expenseEdit[0].id,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { saveEdit, expenseEdit } = this.props;
    const { value, currency, method, tag, description, id } = this.state;
    saveEdit({ value,
      currency,
      method,
      tag,
      description,
      id,
      exchangeRates: expenseEdit[0].exchangeRates });
  }

  render() {
    const { value, description } = this.state;
    const { currencies, expenseEdit } = this.props;
    return (
      <div className="px-6 py-6 bg-green-100">
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
          initial={ expenseEdit[0].currency }
        />
        <Select
          label="Método de pagamento:"
          name="method"
          onChange={ this.handleChange }
          testid="method-input"
          id="method"
          values={ METHOD_PAYMENT }
          initial={ expenseEdit[0].method }
        />
        <Select
          label="Tag:"
          name="tag"
          onChange={ this.handleChange }
          testid="tag-input"
          id="tag"
          values={ TAGS }
          initial={ expenseEdit[0].tag }
        />
        <Input
          label="Descrição:"
          type="text"
          onChange={ this.handleChange }
          value={ description }
          name="description"
          testid="description-input"
        />
        <button className="rounded border bg-green-500 px-4 hover:scale-75" type="button" onClick={ this.handleClick }>Editar despesa</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEdit: (state) => dispatch(saveEditExpense(state)),
});

const mapStateToProps = (state) => ({
  expenseEdit: state.wallet.edit,
  currencies: state.wallet.currencies,
});

EditExpense.propTypes = {
  saveEdit: PropTypes.func.isRequired,
  expenseEdit: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);
