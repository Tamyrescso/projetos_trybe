import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  removeItem,
  getItemLocalStorage,
  addSubItem,
} from '../services/localStorage';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.getProductLocalStorage();
  }

  getProductLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem('item'));
    this.setState({ products });
  };

  handleRemove = (product) => {
    removeItem(product);
    this.setState({ products: getItemLocalStorage() });
  };

  handleAdd = (product) => {
    addSubItem(product, '+');
    this.setState({ products: getItemLocalStorage() });
  };

  handleSub = (product) => {
    if (product[1] === 1) {
      removeItem(product);
    } else {
      addSubItem(product, '-');
    }
    this.setState({ products: getItemLocalStorage() });
  };

  render() {
    const { products } = this.state;
    return (
      <div className="cart-container">
        <h2>Carrinho de Compras</h2>
        <div className="cart-elements">
          {products.length !== 0 ? (
            products.map((product) => (
              <div className="shopping-cart" key={ product[0] }>
                <div className="cart-info">
                  <button
                    type="button"
                    onClick={ () => this.handleRemove(product) }
                  >
                    x
                  </button>
                  <img src={ product[3] } alt="product preview" />
                  <p data-testid="shopping-cart-product-name">
                    {product[0]}
                  </p>
                </div>
                <div className="cart-amount">
                  <button
                    type="button"
                    data-testid="product-increase-quantity"
                    onClick={ () => this.handleAdd(product) }
                    disabled={ product[4] <= product[1] }
                  >
                    +
                  </button>
                  <p data-testid="shopping-cart-product-quantity">
                    {product[1]}
                  </p>
                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ () => this.handleSub(product) }
                  >
                    -
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h2 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h2>
          )}
        </div>
        <div>
          <Link to="/checkout">
            <button type="button" data-testid="checkout-products">
              Finalizar Compra
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
