import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../actions';
import wallet from '../image/wallet.svg';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      isBtnDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    const MIN_CHARACTER_PASSWORD = 6;
    this.setState({ [name]: value }, () => {
      const { email, senha } = this.state;
      const regex = /^.+@\w+(.com)(.br)?/;
      const testEmailWithRegex = regex.test(email);
      if (testEmailWithRegex && senha.length >= MIN_CHARACTER_PASSWORD) {
        this.setState({ isBtnDisabled: false });
      } else {
        this.setState({ isBtnDisabled: true });
      }
    });
  }

  handleClick() {
    const { email } = this.state;
    const { userEmail, history } = this.props;
    userEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, senha, isBtnDisabled } = this.state;
    return (
      <div className="h-screen bg-gradient-to-r from-green-100 via-blue-300 to-yellow-200">
        <img src={wallet} alt="wallet" className="mx-auto pt-16 animate-bounce"/>
        <h1 className="text-center text-4xl font-bold mt-4">Trybewallet</h1>
        <h4 className="text-center text-xl mt-4">Faça login na sua conta</h4>
        <div className="mt-10 bg-white w-1/4 mx-auto rounded-lg p-10 shadow-lg">
          <form>
            <input
              type="text"
              onChange={ this.handleChange }
              placeholder="E-mail"
              value={ email }
              name="email"
              data-testid="email-input"
              className="block border rounded mx-auto placeholder:text-center py-1 px-5"
              required
            />
            <input
              type="password"
              onChange={ this.handleChange }
              placeholder="Senha"
              value={ senha }
              name="senha"
              data-testid="password-input"
              className="block mx-auto border rounded mt-6 placeholder:text-center py-1 px-5"
              required
            />
            <button
              type="button"
              onClick={ this.handleClick }
              disabled={ isBtnDisabled }
              className="block mx-auto mt-6 py-1 px-5 rounded border bg-green-300 hover:scale-75 disabled:text-gray-200"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userEmail: (state) => dispatch(saveEmail(state)),
});

Login.propTypes = {
  userEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
