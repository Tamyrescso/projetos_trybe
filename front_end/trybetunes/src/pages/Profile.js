import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      renderLoading: true,
      name: '',
      image: '',
      email: '',
      description: '',
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

  render() {
    const { renderLoading,
      name,
      email,
      description,
      image } = this.state;
    const showImage = image || 'https://sistema.sistemaunipas.com.br/uploads/fotos/foto_padrao.jpg';
    return (
      <div data-testid="page-profile">
        <Header />
        {renderLoading
          ? <Loading />
          : (
            <div>
              <img src={ showImage } data-testid="profile-image" alt="user" />
              <h2>{name}</h2>
              <h3>{email}</h3>
              <p>{description}</p>
              <Link to="/profile/edit"><p>Editar perfil</p></Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
