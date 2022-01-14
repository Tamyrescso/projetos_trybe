import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
  render() {
    const { onInputChange, filterName, filterRare, filterTrunfo } = this.props;
    return (
      <div className="filter">
        <h5 className="filter-title">Filtros de busca</h5>
        <input
          type="text"
          data-testid="name-filter"
          name="filterName"
          value={ filterName }
          onChange={ onInputChange }
          className="filter-name"
          disabled={ filterTrunfo }
          placeholder="Nome da carta"
        />
        <select
          data-testid="rare-filter"
          name="filterRare"
          value={ filterRare }
          onChange={ onInputChange }
          className="filter-rare"
          disabled={ filterTrunfo }
        >
          <option>todas</option>
          <option>normal</option>
          <option>raro</option>
          <option>muito raro</option>
        </select>
        <label htmlFor="filter-trunfo">
          Super Trunfo
          <input
            type="checkbox"
            data-testid="trunfo-filter"
            name="filterTrunfo"
            checked={ filterTrunfo }
            className="filter-trunfo"
            onChange={ onInputChange }
          />
        </label>
      </div>
    );
  }
}

Filter.propTypes = {
  onInputChange: PropTypes.func,
  filterName: PropTypes.string,
  filterRare: PropTypes.string,
  filterTrunfo: PropTypes.bool,
};

Filter.defaultProps = {
  onInputChange: () => {},
  filterName: '',
  filterRare: '',
  filterTrunfo: false,
};

export default Filter;
