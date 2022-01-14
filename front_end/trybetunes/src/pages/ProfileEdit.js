import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      renderLoading: true,
      name: '',
      image: '',
      email: '',
      description: '',
      isDisabled: false,
      redirect: false,
    };
  }

  componentDidMount() {
    this.handleInitialization();
  }

  handleInitialization = () => {
    getUser()
      .then((result) => {
        this.setState({
          name: result.name,
          email: result.email,
          description: result.description,
          image: result.image,
          renderLoading: false,
        });
      });
  }

  handleChange = ({ target }) => {
    const { name, image, email, description } = this.state;
    const { value, name: nameInput } = target;
    this.setState({ [nameInput]: value }, () => {
      const regex = /^.+@\w+(.com)(.br)?/;
      if (name
          && image
          && email
          && regex.test(email)
          && description) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  handleClick = () => {
    this.setState({ renderLoading: true });
    const { name, image, email, description } = this.state;
    updateUser({
      name,
      email,
      image,
      description,
    });
    this.setState({ redirect: true });
  }

  render() {
    const { renderLoading,
      name,
      email,
      description,
      image,
      isDisabled,
      redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {renderLoading
          ? <Loading />
          : (
            <form>
              <label htmlFor="image">
                Imagem
                <input
                  type="text"
                  data-testid="edit-input-image"
                  onChange={ this.handleChange }
                  name="image"
                  value={ image }
                  id="image"
                />
              </label>
              <label htmlFor="name">
                Nome
                <input
                  type="text"
                  data-testid="edit-input-name"
                  name="name"
                  value={ name }
                  onChange={ this.handleChange }
                  id="name"
                />
              </label>
              <label htmlFor="email">
                E-mail
                <input
                  type="email"
                  data-testid="edit-input-email"
                  name="email"
                  value={ email }
                  onChange={ this.handleChange }
                  id="email"
                />
              </label>
              <label htmlFor="description">
                Descrição
                <textarea
                  data-testid="edit-input-description"
                  name="description"
                  value={ description }
                  onChange={ this.handleChange }
                  id="description"
                />
              </label>
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ isDisabled }
                onClick={ this.handleClick }
              >
                Salvar
              </button>
            </form>
          )}
        { redirect && <Redirect to="/profile" /> }
      </div>
    );
  }
}

export default ProfileEdit;
