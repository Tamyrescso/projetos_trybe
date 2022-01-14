import React from 'react';
import { getItemLocalStorage } from '../services/localStorage';

class Checkout extends React.Component {
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
    const products = getItemLocalStorage();
    this.setState({ products });
  };

  render() {
    const { products } = this.state;
    return (
      <div>
        <h2>Revise seus Produtos</h2>
        <div>
          {products.map((product) => (
            <div key={ product[0] }>
              <img src={ product[3] } alt="product" />
              <p>{product[0]}</p>
              <p>{product[2] * product[1]}</p>
            </div>
          ))}
          {`Total: ${products.reduce(
            (acc, curr) => acc + curr[1] * curr[2],
            0,
          )}`}
        </div>
        <div>
          <h2>Informações do Comprador</h2>
          <form>
            <input
              type="text"
              data-testid="checkout-fullname"
              placeholder="Nome Completo"
            />
            <input
              type="email"
              data-testid="checkout-email"
              placeholder="E-mail"
            />
            <input
              type="text"
              data-testid="checkout-cpf"
              placeholder="CPF"
            />
            <input
              type="text"
              data-testid="checkout-phone"
              placeholder="Telefone"
            />
            <input
              type="text"
              data-testid="checkout-cep"
              placeholder="CEP"
            />
            <input
              type="text"
              data-testid="checkout-address"
              placeholder="Endereço"
            />
          </form>
        </div>
        <div>
          <input type="radio" name="payment" />
          Boleto
          <div>
            Cartão de Crédito
            <input type="radio" name="payment" />
            Visa
            <input type="radio" name="payment" />
            MasterCard
            <input type="radio" name="payment" />
            Elo
          </div>
        </div>
        <div>
          <button type="button">Comprar</button>
        </div>
      </div>
    );
  }
}

export default Checkout;
