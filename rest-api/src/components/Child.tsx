import React from 'react'

// type ChildProps = {
//     label: string;
//     onSelect: () => void;
//   };
/**
  ✔ Child does not know:

  what Tab-1 means
  
  what happens after click
  
  how state is managed
  
  ✔ Child only says:
  
  “Something happened — parent, you decide.”
  
  Parent reacts:
  
    Function runs
  
    Parent state updates
  
    Parent re-renders
  
    UI updates

  **/

type ChildProps = {
    onSend: (value: string) => void;
};

// function Child({ label, onSelect }: ChildProps) {
//   return (
//     <div>
//       <button onClick={onSelect}>
//       {label}
//     </button>
//     </div>
//   )
// }

// Below one is example where child is sending some data to parent on button click.
function Child ({ onSend }: ChildProps) {
    return (
      <button onClick={() => onSend("Hello from Child")}>
        Send Data
      </button>
    );
  };

export default Child
