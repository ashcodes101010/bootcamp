import React from 'react';
import { withRouter } from 'react-router-dom';

const Users = (props) => {
    return <div>{props.match.params.name}</div>
};

export default withRouter(Users);