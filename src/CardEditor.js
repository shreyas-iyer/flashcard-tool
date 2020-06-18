import React from 'react';
import './CardEditor.css';

class CardEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { front: '', back: '' };
  }

  addCard = () => {
    if (this.state.front !== '' && this.state.back !== '') {
      this.props.addCard(this.state);
      this.setState({ front: '', back: '' });
    }
  };

  deleteCard = index => this.props.deleteCard(index);

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.addCard();
    }
  };

  render () {
    const cards = this.props.cards.map((card, index) => {
      return (
        <tr key={index}>
          <td>{index+1}</td>
          <td>{card.front}</td>
          <td>{card.back}</td>
          <td>
            <button onClick={() => this.deleteCard(index)}>Delete card</button>
          </td>
        </tr>
      )
    });

    return (
      <div>
        <h2>Card Editor</h2>
        <table>
          <thead>
            <tr>
<<<<<<< HEAD
              <th></th>
=======
              <th>Number</th>
>>>>>>> 182de99... fixed bugs
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
        <button onClick={this.props.switchMode}>Go To Card Viewer</button>
      </div>
    );
  }
}

export default CardEditor;
