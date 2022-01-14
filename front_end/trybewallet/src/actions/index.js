export const EMAIL_USER = 'EMAIL_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDIT_EXPENSE = 'SAVE_EDIT_EXPENSE';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';

export function saveEmail(payload) {
  return {
    type: EMAIL_USER,
    email: payload,
  };
}

export function addExpense(payload) {
  return {
    type: ADD_EXPENSE,
    expenses: payload,
  };
}

export function removeExpense(id) {
  return {
    type: REMOVE_EXPENSE,
    id,
  };
}

export function editExpense(id) {
  return {
    type: EDIT_EXPENSE,
    id,
  };
}

export function saveEditExpense(payload) {
  return {
    type: SAVE_EDIT_EXPENSE,
    payload,
  };
}

export function saveCurrencies(currencies) {
  return {
    type: SAVE_CURRENCIES,
    currencies,
  };
}

export function fetchCotation(state) {
  return async (dispatch) => {
    const requestAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseJson = await requestAPI.json();
    return dispatch(addExpense({ ...state, exchangeRates: responseJson }));
  };
}
