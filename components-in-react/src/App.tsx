import React from 'react';
import './App.css';

// if it's named impoer then we need curly braces - import { EmployeeDetails } from 
import EmployeeDetails from './components/employee/EmployeeDetails';
import ProductDetails from './components/product/ProductDetails';
import AddProductDetails from './components/product/AddProductDetails';

function App() {
  // let say we want to pass below info to the child
  let name: string = 'jay';
  let product = {
    product_name: 'Laptop',
    brand_name: "Dell",
    price: 80000
  }
  //let say we want to pass array to child like below one
  let products = [
    {
    product_name: 'Laptop',
    brand_name: "HP",
    price: 80000
  },
  {
    product_name: 'Laptop',
    brand_name: "Dell",
    price: 90000
  },
  {
    product_name: 'Laptop',
    brand_name: "Acer",
    price: 85000
  }
  ];

  let string1 = "Jaykumar c.";
  let strring2 = "Cybage software";

  return (
    <>
      {/* Render employee details component */}
      {/* now w need our child to make accept this name, go and check child */}
      {/* Here we passed name and email to child... you can create email just like name as top and that too you can pass or pass the value directly */}
      <EmployeeDetails emp_name={name} email_id='jaykumarc@cybage.com' age= {35}/>
     {/* OR <EmployeeDetails></EmployeeDetails>  this is also correct */}
     <hr></hr>
     {/* Below one is just example how to pass object as prop */}
     {/* <ProductDetails product={product}></ProductDetails> */}
     {/* but if you want to pass the array of object then use below one */}
     {/* Example of childeren props: let say you pass soemthing in beenwen the opening and closing of component e.g "Child component".
     we will be able to access that one use built in children property. for that check the type of child component, we have added childrenin the child component type */}
     
     {/* <ProductDetails product_info={products}>Child Component</ProductDetails> */}

     {/* now let say we want to pass 2 strings.. we can say multiple children then do below thing*/}
     {/* <ProductDetails product_info={products}>{string1}{strring2}</ProductDetails> */}

     {/* Now let say we want to pass the entire react componet as child prop */}
     <ProductDetails product_info={products}><AddProductDetails></AddProductDetails></ProductDetails>

    </>
  );
}

export default App;
