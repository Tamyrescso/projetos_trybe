import React from 'react';
import Sidebar from 'react-sidebar';
import Categories from './Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';
import {
  getItemLocalStorage,
  onHandleClick,
  setItemDefaultLocalStorage,
} from '../services/localStorage';
import Products from '../components/Products';
import CartIcon from '../components/CartIcon';

class Home extends React.Component {
  constructor() {
    super();

    const products = getItemLocalStorage();
    if (!products) setItemDefaultLocalStorage();

    this.state = {
      searchValue: '',
      products: [],
      category: [],
      cartUpdate: 0,
      animation: '',
      productsCart: getItemLocalStorage(),
      sidebarOpen: false,
    };
  }

  componentDidMount() {
    const products = getItemLocalStorage();
    const cartItems = products.reduce((acc, curr) => acc + curr[1], 0);
    this.updateCartCount(cartItems);
  }

  onSetSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open });
  }

  updateCartCount = (cartUpdate) => this.setState({ cartUpdate });

  onInputChange = ({ target: { value } }) => {
    this.setState({ searchValue: value });
  };

  onButtonClick = async () => {
    const { searchValue, category } = this.state;
    const products = await getProductsFromCategoryAndQuery(
      category,
      searchValue,
    );
    this.setState({ products: products.results });
  };

  onCategoryClick = ({ target: { id, checked } }) => {
    this.setState({ category: checked ? id : [] }, this.onButtonClick);
  };

  handleCartUpdate = (productInfo) => {
    onHandleClick(productInfo, 'one');
    const productsCart = getItemLocalStorage();
    this.animateCard();
    const cartItems = productsCart.reduce((acc, curr) => acc + curr[1], 0);
    this.setState({ productsCart, cartUpdate: cartItems });
  };

  animateCard = () => {
    const TIMEOUT_REMOVE = 1000;
    this.setState({ animation: 'animated' });
    setTimeout(() => {
      this.setState({ animation: '' });
    }, TIMEOUT_REMOVE);
  };

  onHandleProductsOrder = ({ target }) => {
    const { products } = this.state;
    if (target.value === 'ascending') {
      products.sort((a, b) => a.price - b.price);
    } else if (target.value === 'descending') {
      products.sort((a, b) => b.price - a.price);
    }
    this.setState({ products });
  };

  render() {
    const { searchValue,
      products,
      cartUpdate,
      animation,
      productsCart,
      sidebarOpen } = this.state;
    return (
      <div className="home-container">
        <Sidebar
          sidebar={ <Categories onCategoryClick={ this.onCategoryClick } /> }
          open={ sidebarOpen }
          onSetOpen={ this.onSetSidebarOpen }
          styles={ { sidebar: { background: 'blue', position: 'fixed' } } }
          rootClassName="sidebar"
        >
          <button
            type="button"
            onClick={ () => this.onSetSidebarOpen(true) }
          >
            Open sidebar
          </button>
        </Sidebar>
        <div className="home-search">
          <div className="search-input">
            <CartIcon animation={ animation } cartUpdate={ cartUpdate } />
            <input
              type="text"
              name="search-products"
              data-testid="query-input"
              value={ searchValue }
              onChange={ this.onInputChange }
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ this.onButtonClick }
            >
              Pesquisar
            </button>
          </div>
          <div className="order-products">
            <select
              name="order"
              onChange={ this.onHandleProductsOrder }
            >
              <option value="">Ordernar por preço</option>
              <option value="ascending">Preço (baixo ao alto)</option>
              <option value="descending">Preço (alto ao baixo)</option>
            </select>
          </div>
          {products.length > 0 ? (
            <Products
              products={ products }
              handleCartUpdate={ this.handleCartUpdate }
              productsCart={ productsCart }
            />
          ) : (
            <p className="initial-msg" data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
