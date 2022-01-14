import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Products extends React.Component {
  verifyProductSelected = (product) => {
    const { productsCart } = this.props;
    const productSelected = productsCart
      .find((element) => element[0] === product.title);

    if (productSelected) {
      return 'selected';
    }
    return '';
  }

  render() {
    const { products, handleCartUpdate } = this.props;
    const TITLE_LIMIT = 40;
    return (
      <div className="products-container">
        {products.map((product) => (
          <div
            className={ `product ${this.verifyProductSelected(product)}` }
            key={ product.id }
          >
            <Link
              data-testid="product-detail-link"
              to={ { pathname: `/product/${product.id}`, state: { product } } }
              className="products-link"
            >
              <div className="product-elements" data-testid="product">
                <p>{`${product.title.slice(0, TITLE_LIMIT)}...`}</p>
                {product.shipping.free_shipping
                && <span data-testid="free-shipping"><i className="bi bi-truck" /></span>}
                <img src={ product.thumbnail } alt="product" />
                <p>{`R$ ${product.price}`}</p>
              </div>
            </Link>
            <button
              type="button"
              data-testid="product-add-to-cart"
              onClick={ () => { handleCartUpdate(product); } }
            >
              Adicionar ao Carrinho
            </button>

          </div>
        ))}
      </div>
    );
  }
}

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCartUpdate: PropTypes.func.isRequired,
  productsCart: PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
};

export default Products;
