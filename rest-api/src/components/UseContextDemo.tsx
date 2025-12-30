import React from 'react'
import ChildComponent from './ChildComponent';
import { UserContext } from './UserContext';

function UseContextDemo() {

    // Used to share data globally across components

    // Avoids prop drilling (like sending data to one chicld to child to child to at last where we need that value(in beetben component did not needed that value but still had to receive it just to pass it down further)))

    // When to use - Theme, user info, selected configuration
    return (
        <UserContext.Provider value="Jay">
          <ChildComponent />
        </UserContext.Provider>
      );
}

export default UseContextDemo
