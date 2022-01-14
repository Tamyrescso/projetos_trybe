import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class CartIcon extends React.Component {
  render() {
    const { cartUpdate, animation } = this.props;
    return (
      <div className={ `details-cart ${animation}` }>
        <Link
          to="/shopping-cart"
          data-testid="shopping-cart-button"
          className="cart-link"
        >
          <i className="bi bi-cart" />
          <span data-testid="shopping-cart-size">{cartUpdate}</span>
        </Link>
      </div>
    );
  }
}

CartIcon.propTypes = {
  animation: PropTypes.string.isRequired,
  cartUpdate: PropTypes.number.isRequired,
};

export default CartIcon;
