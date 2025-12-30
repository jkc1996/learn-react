// 1️⃣ What useCallback REALLY is (plain English)

// useCallback is used to remember a function so React doesn’t recreate it on every render.

// That’s it.
// No magic.

// 2️⃣ Why recreating functions is a problem?

// In JavaScript:

// () => {} !== () => {}


// So every render:

// New function is created

// Even if logic is same

// This becomes a problem when:

// Function is passed to a child component

// Child is memoized (React.memo)

// 3️⃣ Real, meaningful example
// 👉 Scenario

// Parent has a counter

// Parent passes a click handler to Child

// Child should NOT re-render when count changes

// ❌ Without useCallback
// function Parent() {
//   const [count, setCount] = React.useState(0);

//   const handleClick = () => {
//     console.log("Clicked");
//   };

//   return (
//     <>
//       <button onClick={() => setCount(count + 1)}>+</button>
//       <Child onClick={handleClick} />
//     </>
//   );
// }

// const Child = React.memo(({ onClick }: { onClick: () => void }) => {
//   console.log("Child rendered");
//   return <button onClick={onClick}>Child Button</button>;
// });


// 🔴 What happens?

// Click + → Parent re-renders

// handleClick is NEW function

// Child re-renders ❌

// ✅ With useCallback
// const handleClick = React.useCallback(() => {
//   console.log("Clicked");
// }, []);


// 🔵 What changes?

// Same function reference

// Child does NOT re-render

// Better performance

// 4️⃣ Dependency array (VERY IMPORTANT)
// const handleClick = useCallback(() => {
//   console.log(count);
// }, [count]);

// Dependency	Meaning
// []	Function never changes
// [count]	Function updates when count changes
// 5️⃣ Meaningful mental model 🧠

// useCallback is like telling React:
// “Keep using the same function unless I say otherwise.”

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

export {}