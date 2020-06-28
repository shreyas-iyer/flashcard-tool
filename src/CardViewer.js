import React from 'react';
import "./CardViewer.css";

import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import {compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cards : props.cards, index: 0, isFlipped: false };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }

  previousCard = () => {
    this.setState({ index : this.state.index - 1, isFlipped : false  });
  };

  nextCard = () => {
    this.setState({ index : this.state.index + 1, isFlipped : false });
  };

  flipCard = () => this.setState({ isFlipped: !(this.state.isFlipped) });

  handleKeyPress = event => {
    if (event.key === 'ArrowLeft' && this.state.index !== 0) {
      this.previousCard()
    }

    else if (event.key === 'ArrowRight' &&
             this.state.index !== this.props.cards.length - 1) {
      this.nextCard()
    }

    else if (event.keyCode === 32) {
      this.flipCard();
    }
  };

  shuffleCards = () => {
    const cards = this.state.cards.slice();

    for (let i = this.state.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    this.setState({ cards });
  };

  componentDidUpdate(prevProps) {
    if (this.props.cards !== prevProps.cards) {
      this.setState({ cards: this.props.cards });
    }
  };

  render () {
    if (!isLoaded(this.state.cards)) {
      return <div>Loading...</div>
    }

    if(isEmpty(this.state.cards)) {
      return <div>Page not found!</div>;
    }

    let value;
    if (this.state.isFlipped) {
      value = this.state.cards[this.state.index].back
    } else {
      value = this.state.cards[this.state.index].front
    }

    return (
      <div>
        <h2>{this.props.name}</h2>
        <h5>Description: {this.props.description}</h5>
        <div onClick={this.flipCard} className="card">{value}</div>
        <br/>
        <button
          onClick={this.previousCard}
          disabled={this.state.index === 0}
        >
          Previous card
        </button>
        <button
          onClick={this.nextCard}
          disabled={this.state.index === this.state.cards.length - 1}
        >
          Next card
        </button>
        <button onClick={this.shuffleCards}>Shuffle Cards </button>
        <hr/>
        <div>Card {this.state.index+1} out of {this.state.cards.length}</div>
        <hr/>
        <Link to='/'>Home</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log(state);
  const deck = state.firebase.data[props.match.params.deckID];
  const name = deck && deck.name;
  const cards = deck && deck.cards;
  const description = deck && deck.description;
  return { cards: cards, name: name, description: description };
};

export default compose(
  withRouter,
  firebaseConnect(props => {
    const deckID = props.match.params.deckID;
    return [{ path: `/flashcards/${deckID}`, storeAs: deckID }];
  }),
  connect(mapStateToProps),
)(CardViewer);
