import React from 'react';
import './CardViewer.css';

import {Link, withRouter} from 'react-router-dom';
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';

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
        if (!isLoaded(this.props.cards)) {
            return <div>Loading...</div>;
        }

        if (isEmpty(this.props.cards)) {
            return <div>Page not found!</div>;
        }

        const card = this.props.cards[this.state.currentCard][this.state.showFront ? 'front' : 'back'];

        return (
            <div>
                <h2>{this.props.name}</h2>
                <h3>You're currently on Card {this.state.currentCard + 1} out of {this.props.cards.length}.</h3>
                <div className="card" onClick={this.flipCard}>
                    {card}
                </div>
                <br />
                <button disabled={this.state.currentCard === 0} onClick={this.previousCard} >Previous Card</button>
                <button disabled={this.state.currentCard === this.props.cards.length - 1} onClick={this.nextCard} >Next Card</button>
                <hr />
                <Link to="/">Home</Link>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    console.log(state);
    const deck = state.firebase.data[props.match.params.deckId];
    const name = deck && deck.name;
    const cards = deck && deck.cards;
    return { cards: cards, name: name };
};

export default compose(
    withRouter,
    firebaseConnect(props => {
        console.log('props', props);
        const deckId = props.match.params.deckId;
        return [{path: `/flashcards/${deckId}`, storeAs: deckId}];
    }),
    connect(mapStateToProps),
)(CardViewer);