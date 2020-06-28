import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import HomePage from './Homepage';
import {Switch, Route} from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { front: 'front1', back: 'back1'},
        { front: 'front2', back: 'back2'},
      ],
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

  editCards = (index, side, newVal) => {
    const cards = this.state.cards.slice();
    cards[index][side] = newVal;
    this.setState({ cards });
  };

  render() {
    return (
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path='/editor'>
          <CardEditor
            addCard={this.addCard}
            deleteCard={this.deleteCard}
            cards={this.state.cards}
            editCards={this.editCards}
          />
        </Route>
        <Route exact path='/viewer/:deckID'>
          <CardViewer />
        </Route>
        <Route>
          <div>Page not found!</div>
        </Route>
      </Switch>
    );
  }
}

export default App;
