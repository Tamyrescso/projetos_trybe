import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense, editExpense } from '../actions';

const HEADERS_TABLE = ['Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir'];

class TableExpenses extends React.Component {
  constructor() {
    super();
    this.setTableColumns = this.setTableColumns.bind(this);
    this.returnCompleteTable = this.returnCompleteTable.bind(this);
    this.returnHeadersTable = this.returnHeadersTable.bind(this);
  }

  setTableColumns(expenseDescription, id) {
    const INDEX_OF_ID = 8;
    const descriptionWithoutId = expenseDescription.filter((_item, index) => (
      index !== INDEX_OF_ID));
    return (
      <tr key={ `${id} tr` }>
        {descriptionWithoutId.map((expense, index) => (
          <td key={ `${id} ${index}` } className="border border-collapse border-gray-300 text-center">{ expense }</td>))}
      </tr>
    );
  }

  returnCompleteTable(mapExpenses) {
    return (
      <table className="table-fixed border border-collapse border-gray-400 mx-6 mt-6">
        <thead>
          <tr>
            {HEADERS_TABLE.map((header, index) => (
              <th key={ index } className="border border-collapse border-gray-300 text-center w-48 h-16">{ header }</th>))}
          </tr>
        </thead>
        <tbody>
          {mapExpenses.map((expense) => (
            this.setTableColumns(Object.values(expense), expense.id)))}
        </tbody>
      </table>
    );
  }

  returnHeadersTable() {
    return (
      <table className="table-fixed border border-collapse border-gray-400 mx-6 mt-6">
        <thead>
          <tr>
            {HEADERS_TABLE.map((header, index) => (
              <th key={ index } className="border border-collapse border-gray-300 text-center w-48 h-16">{ header }</th>))}
          </tr>
        </thead>
      </table>
    );
  }

  render() {
    const { expenses, deleteExpense, edit } = this.props;
    let mapExpenses = [];
    if (expenses.length > 0) {
      mapExpenses = expenses.map((expense) => {
        const exchangeValue = parseFloat(expense.value)
        * parseFloat(expense.exchangeRates[expense.currency].ask);
        const currencyName = (expense.exchangeRates[expense.currency].name).split('/', 1);
        const rateNumber = parseFloat(expense.exchangeRates[expense.currency].ask);
        return {
          description: expense.description,
          tag: expense.tag,
          method: expense.method,
          value: expense.value,
          currency: currencyName[0],
          exchangeRate: (rateNumber).toFixed(2),
          realValue: exchangeValue.toFixed(2),
          exchangeCurrency: 'Real',
          id: expense.id,
          btnDelete: (
            <>
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => { edit(expense.id); } }
                className="bg-green-500 px-4 mr-2 rounded"
              >
                Editar
              </button>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => { deleteExpense(expense.id); } }
                className="bg-red-500 px-4 rounded"
              >
                Deletar
              </button>

            </>),
        };
      });
    }
    return (
      <div>
        {mapExpenses.length > 0
          ? this.returnCompleteTable(mapExpenses)
          : this.returnHeadersTable()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (state) => dispatch(removeExpense(state)),
  edit: (state) => dispatch(editExpense(state)),
});

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
