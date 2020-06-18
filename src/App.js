import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { front: 'front1', back: 'back1'},
        { front: 'front2', back: 'back2'},
      ],
      editor: true,
    };
  }

  //Added the if-statement below to prevent cards with empty front or backs
  addCard = card => {
    if (card.front.trim() !== '' && card.back.trim() !== '') {
    const cards = this.state.cards.slice().concat(card);
    this.setState({ cards });
    }
  };

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  };

  switchMode = () => {
    if (this.state.cards.length !== 0) {
      this.setState({ editor: !this.state.editor });
    }
  };

  editCards = (index, side, newVal) => {
    const cards = this.state.cards.slice();
    cards[index][side] = newVal;
    this.setState({ cards });
  };

  render() {
    if (this.state.editor) {
      return (
        <CardEditor
          addCard={this.addCard}
          deleteCard={this.deleteCard}
          cards={this.state.cards}
          switchMode={this.switchMode}
          editCards={this.editCards}
        />
      );
    } else {
      return (
        <CardViewer
          cards={this.state.cards}
          switchMode={this.switchMode}
        />
      );
    }
  }
}

export default App;
