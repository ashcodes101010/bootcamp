import React from 'react';
import './Homepage.css';
import {Link} from 'react-router-dom';

import {firebaseConnect, isLoaded} from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Homepage = props => {
    if (!isLoaded(props.homepage)) {
        return <div>Loading...</div>;
    }

    const decks = Object.keys(props.homepage).map(deck => {
        return (
            <div key={deck}>
                <Link to={`/viewer/${deck}`}><button class="big">{props.homepage[deck].name}</button></Link>
            </div>
        );
    });

     return (
        <body>
            <div> 
                <h1>Home</h1>
                <Link to="/editor"><button class="big">Create a new card deck</button></Link>
                <h2>Flashcards</h2>
                {decks}
            </div>
        </body> 
    );
}

const mapStateToProps = state => {
    return { homepage: state.firebase.data.homepage };
};

export default compose(
    firebaseConnect(['/homepage']),
    connect(mapStateToProps),
 )(Homepage);
