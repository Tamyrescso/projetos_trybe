import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditExpense from '../components/EditExpense';
import FormExpense from '../components/FormExpense';
import Header from '../components/Header';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  render() {
    const { expenseEdit } = this.props;
    return (
      <div className="bg-gray-100 h-screen">
        <Header />
        {expenseEdit.length > 0 ? <EditExpense /> : <FormExpense />}
        <TableExpenses />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenseEdit: state.wallet.edit,
});

Wallet.propTypes = {
  expenseEdit: PropTypes.arrayOf(PropTypes.object),
};

Wallet.defaultProps = {
  expenseEdit: [],
};

export default connect(mapStateToProps, null)(Wallet);
