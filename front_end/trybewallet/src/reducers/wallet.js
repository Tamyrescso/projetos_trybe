import { ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EDIT_EXPENSE,
  SAVE_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  edit: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => (
        expense.id !== parseInt(action.id, 10))),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses,
      edit: state.expenses.filter((expense) => expense.id === action.id),
    };
  case SAVE_EDIT_EXPENSE:
    return {
      ...state,
      edit: [],
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return action.payload;
        }
        return expense;
      }),
    };
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  default:
    return state;
  }
};

export default walletReducer;
