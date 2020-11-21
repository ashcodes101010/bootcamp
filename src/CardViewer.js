import React from 'react';
import './CardViewer.css';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFront: true,
            currentCard: 0,
        };
    }

    flipCard = () => this.setState({ showFront: !this.state.showFront });

    previousCard = () => {
        if (this.state.currentCard > 0) {
            this.setState({
                currentCard: this.state.currentCard - 1,
                showFront: true,
            });
        }
    };

    nextCard = () => {
        if (this.state.currentCard < this.props.cards.length - 1) {
            this.setState({
                currentCard: this.state.currentCard + 1,
                showFront: true,
            });
        }
    };

    render() {
        const card = this.props.cards[this.state.currentCard][this.state.showFront ? 'front' : 'back'];

        return (
            <div>
                <h2>Card Viewer</h2>
                <h3>You're currently on Card {this.state.currentCard + 1} out of {this.props.cards.length}.</h3>
                <div className="card" onClick={this.flipCard}>
                    {card}
                </div>
                <br />
                <button disabled={this.state.currentCard == 0} onClick={this.previousCard} >Previous Card</button>
                <button disabled={this.state.currentCard == this.props.cards.length - 1} onClick={this.nextCard} >Next Card</button>
                <hr />
                <button onClick={this.props.switchMode}>Go to card editor</button>
            </div>
        );
    }
}

export default CardViewer;