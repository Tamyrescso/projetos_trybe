import React, { Component } from 'react';
import ReactStars from 'react-rating-stars-component';
import Rating from './Rating';

class FormEvaluation extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      comment: '',
      rating: 0,
      allComments: [],
    };
  }

  componentDidMount() {
    const comments = JSON.parse(localStorage.getItem('comments'));
    if (!comments) return localStorage.setItem('comments', JSON.stringify([]));
    this.onHandleInitialization(comments);
  }

  onHandleInitialization = (comments) => {
    this.setState({ allComments: comments });
  };

  onHandleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  onRatingChange = (event) => {
    this.setState({ rating: event });
  };

  onHandleClick = () => {
    const { email, comment, rating } = this.state;
    const objComment = {
      email,
      comment,
      rating,
    };
    this.setState(
      (prev) => ({ allComments: [...prev.allComments, objComment] }),
      () => {
        const { allComments } = this.state;
        localStorage.setItem('comments', JSON.stringify(allComments));
      },
    );
  };

  render() {
    const { email, comment, allComments } = this.state;
    return (
      <div className="evaluation-container">
        <form>
          <fieldset>
            <legend>Avaliações</legend>
            <div>
              <input
                type="email"
                placeholder="Email"
                onChange={ this.onHandleChange }
                name="email"
                value={ email }
              />
              <ReactStars
                count={ 5 }
                size={ 24 }
                activeColor="#ffd700"
                onChange={ this.onRatingChange }
              />
            </div>
            <textarea
              data-testid="product-detail-evaluation"
              placeholder="Mensagem (opcional)"
              onChange={ this.onHandleChange }
              name="comment"
              value={ comment }
            />
            <button type="button" onClick={ this.onHandleClick }>
              Avaliar
            </button>
          </fieldset>
        </form>
        {allComments
          && allComments.map((comm, i) => <Rating key={ i } { ...comm } />)}
      </div>
    );
  }
}

export default FormEvaluation;
