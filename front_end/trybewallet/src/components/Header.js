import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import wallet from '../image/wallet.svg';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const expensesSum = expenses.reduce((acc, curr) => {
      const currencySelected = curr.currency;
      const valueInReais = curr.exchangeRates[currencySelected].ask;
      return acc + parseFloat(curr.value * valueInReais);
    }, 0);
    return (
      <div className="bg-gray-300 py-4 flex justify-between px-6">
        <div className="flex items-center">
          <p data-testid="email-field">
            Email:
            {' '}
            { email }
          </p>
        </div>
        <img src={wallet} alt="wallet" className="w-20" />
        <div className="flex justify-around items-center">
          <p>
            Despesa Total: R$
            {' '}
          </p>
          <p data-testid="total-field">
            { expensesSum.toFixed(2) }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
