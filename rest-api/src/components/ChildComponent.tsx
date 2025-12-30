import React from 'react'
import { UserContext } from './UserContext';

function ChildComponent() {
    const user = React.useContext(UserContext);
    return <p>Hello {user}</p>;
}

export default ChildComponent
