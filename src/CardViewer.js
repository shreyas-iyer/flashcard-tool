import React from 'react';

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
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


=======
    this.state = { index: 0, isFlipped: false };
    this.cards = this.props.cards;
    this.numCards = this.props.cards.length;
  }

  previousCard = () => {
    this.setState({ index : this.state.index - 1, isFlipped : false  });
  }

  nextCard = () => {
    this.setState({ index : this.state.index + 1, isFlipped : false });
  }

  flipCard = () => this.setState({ isFlipped: !(this.state.isFlipped) });

>>>>>>> 182de99... fixed bugs
  handleKeyPress = event => {
    if (event.key === 'ArrowLeft' && this.state.index !== 0) {
      this.previousCard()
    }
<<<<<<< HEAD

=======
>>>>>>> 182de99... fixed bugs
    else if (event.key === 'ArrowRight' &&
             this.state.index !== this.numCards - 1) {
      this.nextCard()
    }
<<<<<<< HEAD

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

=======
>>>>>>> 182de99... fixed bugs
  };

  render () {
    let value;
    if (this.state.isFlipped) {
<<<<<<< HEAD
      value = this.state.cards[this.state.index].back
    } else {
      value = this.state.cards[this.state.index].front
    }

    return (
      <div>
        <h2>Card Viewer</h2>
        <div onClick={this.flipCard}>{value}</div>
=======
      value = this.cards[this.state.index].back
    } else {
      value = this.cards[this.state.index].front
    }

    return (
      <div tabIndex={0} onKeyDown={this.handleKeyPress}>
        <h2>Card Viewer</h2>
        <button onClick={this.flipCard}>{value}</button>
>>>>>>> 182de99... fixed bugs
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
<<<<<<< HEAD
        <button onClick={this.shuffleCards}>Shuffle Cards </button>
        <hr/>
        <div>
          Card {this.state.index+1} out of {this.numCards}
=======
        <hr/>
        <div>
          Card {this.state.index+1}/{this.numCards}
>>>>>>> 182de99... fixed bugs
        </div>
        <hr/>
        <button onClick={this.props.switchMode}>Go To Card Editor</button>
      </div>
    );
  }
}

export default CardViewer;