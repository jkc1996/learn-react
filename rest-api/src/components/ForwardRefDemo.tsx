import React, { useRef, forwardRef } from 'react';

// 1. THE CHILD COMPONENT
// We MUST wrap the child in forwardRef.
// It receives (props, ref) as arguments.
const ChildInput = forwardRef<HTMLInputElement, {}>((props, ref) => {
  return (
    <div style={{ padding: 20, border: "1px dashed gray" }}>
      <h3>I am the Child</h3>
      {/* We attach the incoming 'ref' to the actual HTML input */}
      <input ref={ref} type="text" placeholder="Child Input..." />
    </div>
  );
});

// 2. THE PARENT COMPONENT
function ForwardRefDemo() {
  // Create the ref in the Parent
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    // The Parent can now access the Child's input directly!
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.backgroundColor = "yellow"; // Just to prove it works
    }
  };

  return (
    <div style={{ padding: 20, border: "2px solid blue" }}>
      <h2>I am the Parent</h2>
      <button onClick={handleFocus}>Focus Child Input</button>
      <br /><br />
      
      {/* Pass the ref down to the custom component */}
      <ChildInput ref={inputRef} />
    </div>
  );
}

export default ForwardRefDemo;