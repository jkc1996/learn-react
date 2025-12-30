import React, {useState} from 'react'

function ProductDetails() {

// let say we wanted to save the quantity of a product a user wants to buy
// we could use useState to manage that state

const [quantity, setQuantity] = useState(10);

function increment_quantity() {
    // see here we can not simly do quantity = quantity + 1
    // we have to use the setQuantity function to update the state becuase if we do we will get an error like you can not assign to a constant variable
  setQuantity(quantity + 1);
}

  return (
    <div>
      Product Quantity: {quantity}
      <br></br>
      {/* <button onClick={increment_quantity}>
        Increase Quantity
      </button> */}

      {/* lets try arrow function method here as this just one liner, no need of seperate function */}
      <button onClick={() => setQuantity(quantity + 1)}>
        Increase Quantity
      </button>
    </div>
  )
}

export default ProductDetails
