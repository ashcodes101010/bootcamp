import React from 'react';
import './Homepage.css';
import {Link} from 'react-router-dom';

class Homepage extends React.Component {
    render() {
        return (
            <body>
                <div> 
                    <h1>Flashcards</h1>
                    <Link to="/editor"><button>Card Editor</button></Link>
                    <Link to="/viewer"><button>Card Viewer</button></Link>
                </div>
            </body> 
        );
    }
}

export default Homepage;