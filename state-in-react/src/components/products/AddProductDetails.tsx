import React, { ChangeEvent, FormEvent, useState } from 'react'

type product_type = {
    id: number;
    productName: string;
    brandName: string;
    price: number;
}

function AddProductDetails() {

// declare a product object in 'state' to hold the data coming from form
// So we we got the variable name 'product' which is going to hold the data. We got the setter method 'setProduct' to modify that data.

const [product, setProduct] = useState({} as product_type);

// now we want to populate the above values in the form. for that what we will do is
// we will bind the input fields with the state variable 'product' using value attribute
// but by doing this it will give you console errors like below:

// "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."

// and you will not be able to change the values in the fields too.

// but first lets initialize the form with empty values
// const [product, setProduct] = useState({
//     id: 0,
//     productName: '',
//     brandName: '',
//     price: 0
// })
// but let say we have 50 fields then how many things you will initailize  so for that we have easy way like below:
// const [product, setProduct] = useState({} as product_type);

// next what ?

// What I want to see whenever user is going to enter the details into this particular text box, I wanted to read that data and assign it to the product object, set it to the product object into respective field.

// OK, so for that purpose we have to register one event called onchange event. OK, we have to register one event called onchange event. So what I'm going to do is for every field, once the value get modified, we wanted to register onChange() event.

// And to handle that event, we are going to define one function here. I'm defining the arrow function. 

// like this - on each field - onChange={handleChange}. now since you have a event handler method (onChange), that method always takes the event object

// Now as you are in a TypeScript you have to specify the type of the event. So how we are gonna specify the type of the event? See.

//These are which type of text boxes input type, right? We have created a input type of text boxes, so we are saying your event and that event is of the type HTML.

let handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name);
    console.log(event.target.value);
    // now we have to set these values to the product object in the state
    // it is important here that our input field name attribute should match with the object field names because we are doing this - [event.target.name]: event.target.value
    // now why spread operator here ?
    // see when you are updating one field in the object, all other fields will become undefined if you do not use spread operator because we are creating a new object here.
    // so to avoid that we use spread operator to copy all other existing fields and then only update the field which is being changed.
    setProduct({
        ...product,
        [event.target.name]: event.target.value
    })
}

//  I wanted to submit this data to my back end, whatever it is. OK, so we have a submit button and on that I'm going to have the on submit handler OK.

let submitHandler = (event: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    event.preventDefault(); // to prevent the default behaviour of form submission, which actually reloads the page
    console.log(product);
    // here we can call the backend service to submit the product object
}
  return (
    <div>
      <form onSubmit={submitHandler}>
        <table>
          <tbody>
            <tr>
              <td>Product Id:</td>
              <td>
                <input type="number" name="id" value={product.id} onChange={handleChange}/>
              </td>
            </tr>
            <tr>
              <td>Product Name:</td>
              <td>
                <input type="text" name="productName" value={product.productName} onChange={handleChange}/>
                </td>
            </tr>
            <tr>
                <td>Brand Name:</td>
                <td>
                    <input type="text" name="brandName" value={product.brandName} onChange={handleChange}/>
                </td>
            </tr>
            <tr>
                <td>Price:</td>
                <td>
                    <input type="number" name="price" value={product.price} onChange={handleChange}/>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <button type="submit" value={'Add Product'}>Add Product</button>
                </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default AddProductDetails
