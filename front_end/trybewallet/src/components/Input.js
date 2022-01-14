import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { type, name, label, onChange, value, id, testid } = this.props;
    return (
      <label htmlFor={ name }>
        { label }
        <input
          type={ type }
          name={ name }
          value={ value }
          onChange={ onChange }
          id={ id }
          data-testid={ testid }
          className="border rounded m-2 text-center"
        />
      </label>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  testid: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  value: '',
  name: '',
  id: '',
  onChange: null,
  testid: '',
};

export default Input;
