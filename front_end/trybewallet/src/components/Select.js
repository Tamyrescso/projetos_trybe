import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  render() {
    const { name, label, onChange, values, testid, id, initial } = this.props;
    return (
      <label htmlFor={ name }>
        { label }
        <select
          onChange={ onChange }
          name={ name }
          id={ id }
          data-testid={ testid }
          className="border rounded m-2 text-center"
        >
          {name === 'currency'
            ? values.map((value, index) => {
              if(initial && initial === value) {
                return (
                  <option
                    key={ index }
                    data-testid={ value }
                    value={ value }
                    selected
                  >
                    { value }
                  </option>
                )
              }
              return (
                <option
                    key={ index }
                    data-testid={ value }
                    value={ value }
                  >
                    { value }
                </option>
              )
            })
            : values.map((value, index) => {
              if(initial && initial === value) {
                return (
                  <option key={ index } value={ value } selected >
                    { value }
                  </option>
                )
              }
              return (
                <option key={ index } value={ value }>
                  { value }
                </option>
              )
            })}
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  label: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  onChange: PropTypes.func,
  testid: PropTypes.string,
  id: PropTypes.string,
};

Select.defaultProps = {
  label: '',
  values: [],
  name: '',
  onChange: null,
  testid: '',
  id: '',
};

export default Select;
