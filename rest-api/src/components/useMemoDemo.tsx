// Example - 1

// 👉 Without useMemo

// Filtering runs on every render

// const filteredUsers = users.filter(user => user.active);

// ✅ With useMemo

// Filtering runs only when users changes

// const filteredUsers = React.useMemo(() => {
//   return users.filter(user => user.active);
// }, [users]);

// Why this is useful?

// Avoids repeated filtering

// Improves performance for large lists



// Example - 2 - Expensive calculation

// const result = React.useMemo(() => {
//     console.log("Calculating...");
//     let total = 0;
//     for (let i = 0; i < 100000000; i++) {
//       total += i;
//     }
//     return total;
//   }, []);

//   What happens?
//   Runs once
  
//   Cached value reused
  
//   No recalculation on re-render



// Example 3️ - Derived UI value (very practical)

// 👉 Total price calculation
// const totalPrice = React.useMemo(() => {
//   return cartItems.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );
// }, [cartItems]);

// Why useMemo?

// Calculation depends on cartItems

// Recalculate only when cart changes

export {}