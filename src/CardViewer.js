import React from 'react';
import { Link } from 'react-router-dom';
import "./CardViewer.css";

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0, isFlipped: false, cards: props.cards };
    this.numCards = this.props.cards.length;
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
             this.state.index !== this.numCards - 1) {
      this.nextCard()
    }

    else if (event.keyCode === 32) {
      this.flipCard();
    }
  };

  shuffleCards = () => {
    const cards = this.state.cards.slice();

    for (let i = this.numCards - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    this.setState({ cards });
  };

  render () {
    let value;
    if (this.state.isFlipped) {
      value = this.state.cards[this.state.index].back
    } else {
      value = this.state.cards[this.state.index].front
    }

    return (
      <div>
        <h2>Card Viewer</h2>
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
          disabled={this.state.index === this.numCards - 1}
        >
          Next card
        </button>
        <button onClick={this.shuffleCards}>Shuffle Cards </button>
        <hr/>
        <div>Card {this.state.index+1} out of {this.numCards}</div>
        <hr/>
        <Link to='/editor'>Go To Card Editor</Link>
      </div>
    );
  }
}

export default CardViewer;
