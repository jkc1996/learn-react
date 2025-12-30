import React, { useState } from 'react'
import InputChild from './InputChild';
import DisplayChild from './DisplayChild';

//State lifting means moving state to the nearest common parent so multiple child components can share it.
// Goal:

// InputChild updates text

// DisplayChild shows the same text

// They must share state

//What just happened? (very important)

// State lives in Parent

// Parent passes:

// Setter → InputChild

// Value → DisplayChild

// Both children stay in sync

function ParentStateLifting() {
    const [text, setText] = useState("");
  return (
    <div>
       <InputChild onChangeText={setText} />
      <DisplayChild value={text} />
    </div>
  )
}

export default ParentStateLifting
