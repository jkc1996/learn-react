// REACT HOOKS - USECALLBACK
// ==================================================

// GOAL: 
// To prevent functions from being re-created on every render, preserving 
// "Referential Equality" to optimize child component rendering.

// ==================================================
// 1. THE PROBLEM (Referential Integrity)
// ==================================================

// In JavaScript, functions are objects. 
// Every time a Parent component re-renders, all functions defined inside 
// it are re-created at NEW memory addresses.

// - Render 1: handleClick is at Address A.
// - Render 2: handleClick is at Address B.
// - Result: Address A !== Address B.

// THE CONSEQUENCE:
// If you pass this function to a Child Component wrapped in `React.memo`, 
// React sees the prop has changed (New Address) and forces the Child 
// to re-render, making `React.memo` useless.

// ==================================================
// 2. THE SOLUTION (useCallback)
// ==================================================

// `useCallback` freezes the function definition. 
// It returns the EXACT SAME function reference (same memory address) 
// across multiple renders, unless dependencies change.

// SYNTAX:
// const memoizedCallback = useCallback(() => {
//     doSomething(a, b);
// }, [a, b]);

// ==================================================
// 3. CODE EXAMPLE (BEFORE & AFTER)
// ==================================================

// SCENARIO: 
// Parent has a counter. Child is heavy and wrapped in React.memo.

// WITHOUT useCallback (Bad):
// --------------------------------------------------
// const handleClick = () => { console.log("Clicked"); };
// // Result: Every time Parent renders, 'handleClick' is new. 
// // Child re-renders unnecessarily.

// WITH useCallback (Good):
// --------------------------------------------------
// const handleClick = useCallback(() => {
//     console.log("Clicked");
// }, []); 
// // Result: 'handleClick' stays the same forever. 
// // Child skips re-rendering when Parent updates.

// ==================================================
// 4. WHEN TO USE IT (THE CHECKLIST)
// ==================================================

// Do NOT wrap every function. Use it ONLY if:

// 1. [ ] You are passing the function as a prop to a component wrapped 
//        in `React.memo`.
// 2. [ ] The function is a dependency in a `useEffect` hook 
//        (e.g., `useEffect(..., [myFunc])`).

// ==================================================
// 5. INTERVIEW SUMMARY
// ==================================================

// "useCallback is a hook that returns a memoized version of a function. 
// Its primary purpose is to maintain Referential Equality. We use it to 
// prevent unnecessary re-renders of Child components optimized with 
// React.memo, which would otherwise treat the re-created function as a 
// new prop."

// 6️⃣ When SHOULD you use useCallback?

// ✔ Use when:

// Passing functions to child components

// Child is memoized

// Performance optimization needed

// ❌ Don’t use when:

// Simple components

// No child memoization

// Premature optimization

// 7️⃣ Interview one-liner (memorize 🥇)

// “useCallback memoizes function references to prevent unnecessary child re-renders.”

import React, { useState, useCallback } from 'react';

type ChildProps = {
    onAction: () => void;
}
const Child = React.memo((props: ChildProps) => {
    console.log("🟢 CHILD RENDERED"); 
    return <button onClick={props.onAction}>Click Child</button>;
});

export default function UseCallbackDemo() {
    const [count, setCount] = useState(0);

    // ✅ SOLUTION: useCallback freezes this function.
    // It remains the SAME reference between renders.
    const handleClick = useCallback(() => {
        console.log("Button clicked");
    }, []); // Empty dependency array = Never change, but but if in this dependency if we pass count then our child will rerender whenever count changes.

    return (
        <div>
            <h1>Parent Count: {count}</h1>
            {/* Clicking this re-renders Parent, but NOT Child */}
            <button onClick={() => setCount(count + 1)}>Increment Parent</button>
            
            <Child onAction={handleClick} />
        </div>
    );
}