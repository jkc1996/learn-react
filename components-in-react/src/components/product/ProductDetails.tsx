import { ReactNode } from "react";

type prop_type = {
  // if you want to pass single object then use below one
  // product: {
  //     product_name: string,
  //     brand_name: string,
  //     price: number
  // }

  // let say you want to accept array of object

  product_info: {
    product_name: string;
    brand_name: string;
    price: number;
  }[],

  // The below one is built in reserved this in react. let say we want to pass multiple thing here.. like 2 strings then make it as arrya
//   children: string

//now it expects multiple children from parent
 // children: string[]

  // Passing entire react component as children
  children: ReactNode
};

function ProductDetails(props: prop_type) {
  return (
    <>
    {/* As you can see below heading was passed from parent as childen way.. it was passed between opening and cloing one*/}
      <h1>{props.children}</h1>
      {/* Below one only works when we have single object */}
      {/* <h3>
                Product name: {props.product.product_name}<br></br>
                Brand name: {props.product.brand_name}<br></br>
                Price: {props.product.price}
            </h3> */}

      {/* In case of array of object we need to iterate it. we will use map function, which takse callback.
            As you can see below code(the code written in tbody section basically) is written in {} becase we are writing JS code in between the html code.
            the inner return statemtnis for map. it returns the one one value thats why.
            */}
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Brand Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {props.product_info.map((product) => {
            return (
              <tr>
                <td>{product.product_name}</td>
                <td>{product.brand_name}</td>
                <td>{product.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ProductDetails;
