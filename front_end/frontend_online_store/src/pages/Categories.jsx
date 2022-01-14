import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

export default class Categories extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.getJSONCategories();
  }

getJSONCategories = async () => {
  const categories = await api.getCategories();
  this.setState({ categories });
}

render() {
  const { categories } = this.state;
  const { onCategoryClick } = this.props;
  return (
    <div className="categories">
      <h2>Categorias</h2>
      {categories.map(({ name, id }) => (
        <label key={ id } htmlFor={ id }>
          <input
            type="radio"
            data-testid="category"
            id={ id }
            name="categories"
            onChange={ onCategoryClick }
          />
          {name}
        </label>))}
    </div>
  );
}
}

Categories.propTypes = {
  onCategoryClick: PropTypes.func.isRequired,
};
