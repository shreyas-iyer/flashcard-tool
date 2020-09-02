import React from 'react';
import './CardEditor.css';

import { Link, withRouter, Redirect } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { connect } from 'react-redux';

class CardEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { front: 'front1', back: 'back1'},
        { front: 'front2', back: 'back2'},
      ],
      front: '',
      back: '',
      name: '',
      description: '',
      private: false,
     };
  }

  createDeck = () => {
    const deckID = this.props.firebase.push('/flashcards').key;
    const updates = {};
    const newDeck = {
      cards: this.state.cards,
      name: this.state.name,
      description: this.state.description,
      owner: this.props.isLoggedIn,
      visibility: this.state.private ? 'private' : 'public',
    };
    updates[`/flashcards/${deckID}`] = newDeck;
    updates[`/homepage/${deckID}`] = {
      name : this.state.name,
      owner: this.props.isLoggedIn,
      visibility: this.state.private ? 'private' : 'public',
    };
    const onComplete = () => this.props.history.push(`/viewer/${deckID}`);
    this.props.firebase.update("/", updates, onComplete);
  };

  addCard = () => {
    if (!this.state.front.trim() || !this.state.back.trim()) {
      alert("Cannot add empty card");
      return;
    }

    const newCard = {front: this.state.front, back: this.state.back }
    const cards = this.state.cards.slice().concat(newCard);
    this.setState({ cards, front: '', back: '' });
  };

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  };

  editCards = (index, side, event) => {
    const cards = this.state.cards.slice();
    cards[index][side] = event.target.value;
    this.setState({ cards });
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.addCard();
    }
  };

  handleVisibilityChange = event => {
    this.setState({ [event.target.name]: event.target.checked })
  }

  render () {
    if(!this.props.isLoggedIn) {
      return <Redirect to='/register'/>
    }
    const cards = this.state.cards.map((card, index) => {
      return (
        <tr key={index}>
          <td>{index+1}</td>
          <td>
            <input
              onChange={event => this.editCards(index, 'front', event)}
              value={card.front}
            />
          </td>
          <td>
            <input
              onChange={event => this.editCards(index, 'back', event)}
              value={card.back}
            />
          </td>
          <td>
            <button
              onClick={() => this.deleteCard(index)}
            >
              Delete card
            </button>
          </td>
        </tr>
      )
    });

    return (
      <div>
        <h2>Card Editor</h2>
        <div>
          Deck Name:
          <br/>
          <input
            name="name"
            placeholder="Name of Deck"
            value={this.state.name}
            onChange={this.handleChange}
          />
        <br/>
        <br/>
        Deck Description:
        <br/>
        <input
          name="description"
          placeholder="Description of Deck"
          value={this.state.description}
          onChange={this.handleChange}
        />
        </div>
        <br/>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Front</th>
              <th>Back</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{cards}</tbody>
        </table>
        <br/>
        <input
          name='front'
          onChange={this.handleChange}
          placeholder="Front of card"
          value={this.state.front}
          onKeyDown={this.handleKeyPress}
        />
        <input
          name='back'
          onChange={this.handleChange}
          placeholder="Back of card"
          value={this.state.back}
          onKeyDown={this.handleKeyPress}
        />
        <button onClick={this.addCard}>Add card</button>
        <hr/>
        <div>
          Make this deck private{' '}
          <input
            name='private'
            onChange={this.handleVisibilityChange}
            type='checkbox'
            value={this.state.private}
          />
        </div>
        <br />
        <div>
          <button
            disabled={!this.state.name.trim() ||
                      !this.state.description.trim() ||
                      this.state.cards.length === 0}
            onClick={this.createDeck}
          >
            Create Deck
          </button>
        </div>
        <br/>
        <Link to='/'>Home</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isLoggedIn: state.firebase.auth.uid };
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
  withRouter,
)(CardEditor);
