import React from 'react';
import PropTypes from 'prop-types';
import {
  getItemLocalStorage,
  onHandleClick,
  removeItem,
} from '../services/localStorage';
import FormEvaluation from '../components/FormEvaluation';
import CartIcon from '../components/CartIcon';

class ProductDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      productInfo: {},
      cartUpdate: 0,
      animation: '',
      currentQnt: 1,
      currentProduct: [],
    };
  }

  componentDidMount() {
    const products = getItemLocalStorage();
    const cartItems = products.reduce((acc, curr) => acc + curr[1], 0);
    this.updateCartCount(cartItems);
    this.getProductInfo();
    this.checkStorageProduct(products);
  }

  updateCartCount = async (cartUpdate) => this.setState({ cartUpdate });

  getProductInfo = async () => {
    const {
      location: {
        state: { product },
      },
    } = this.props;
    this.setState({ productInfo: product });
  };

  checkStorageProduct = (products) => {
    const {
      location: {
        state: { product },
      },
    } = this.props;
    const currentProduct = products.find((item) => item[0] === product.title);
    if (currentProduct) {
      this.setState({ currentQnt: currentProduct[1], currentProduct });
    }
  };

  handleCurrentQuantity = (operator) => {
    if (operator === '+') {
      this.setState((prevState) => ({
        currentQnt: prevState.currentQnt + 1,
      }));
    } else {
      this.setState((prevState) => ({
        currentQnt: prevState.currentQnt - 1,
      }));
    }
  };

  handleCartUpdate = (productInfo) => {
    const { currentQnt, currentProduct } = this.state;
    if (currentQnt === 0) {
      removeItem(currentProduct);
    } else {
      onHandleClick(productInfo, currentQnt);
    }
    this.animateCard();
    const products = getItemLocalStorage();
    const cartItems = products.reduce((acc, curr) => acc + curr[1], 0);
    this.updateCartCount(cartItems);
  };

  animateCard = () => {
    const TIMEOUT_REMOVE = 1000;
    this.setState({ animation: 'animated' });
    setTimeout(() => {
      this.setState({ animation: '' });
    }, TIMEOUT_REMOVE);
  };

  render() {
    const { productInfo, cartUpdate, animation, currentQnt } = this.state;
    return (
      <div className="product-info-container">
        <div className="align-cart">
          <CartIcon animation={ animation } cartUpdate={ cartUpdate } />
        </div>
        <div className="product-info">
          <div className="title-price">
            <h4 data-testid="product-detail-name">{productInfo.title}</h4>
            <p>{`R$ ${productInfo.price}`}</p>
            {productInfo.shipping && productInfo.shipping.free_shipping && (
              <span data-testid="free-shipping">
                <i className="bi bi-truck" />
                Frete Grátis
              </span>
            )}
            <div className="details-button">
              <button
                type="button"
                data-testid="product-detail-add-to-cart"
                className="add-details"
                onClick={ () => {
                  this.handleCartUpdate(productInfo);
                } }
              >
                Adicionar ao Carrinho
              </button>

              <button
                type="button"
                disabled={ currentQnt === 0 }
                onClick={ () => {
                  this.handleCurrentQuantity('-');
                } }
              >
                -
              </button>
              <p>{currentQnt}</p>
              <button
                type="button"
                disabled={ currentQnt === productInfo.sold_quantity }
                onClick={ () => {
                  this.handleCurrentQuantity('+');
                } }
              >
                +
              </button>
            </div>
          </div>
          <div className="img-button">
            <img src={ productInfo.thumbnail } alt="" />
          </div>
        </div>
        <FormEvaluation />
      </div>
    );
  }
}

ProductDetail.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      product: PropTypes.shape({
        title: PropTypes.string,
        thumbnail: PropTypes.string,
        id: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default ProductDetail;
