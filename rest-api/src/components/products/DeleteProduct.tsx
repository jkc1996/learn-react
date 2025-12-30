import React from 'react'
import { useParams } from 'react-router-dom';

// type params_type = {
//     pid: string
// }

// suppose 2 things are coming in url
type params_type = {
    pid: string,
    name:  string
}

function DeleteProduct() {
      // just mentioned the type of params while using useParams hook
    const params = useParams<params_type>();

    // just converting the string 'pid' to number. 
    let product_id: number = 0;
    if(params.pid){
        product_id = parseInt(params.pid);
    }
  return (
    <div>
        {/* now how to read data from url ? we have params hook (just a function remember !) for this,
        which - Returns an object of key/value-pairs of the dynamic params from the current URL that were matched by the routes.
        
        in our case key is - 'pid' and values s value passed to this 'pid'

        now just rememer that this 'params' is always an object and value inside this object is always 'string'

        now lets just define the type 'params_type' for this params object  */}
        <h1>Delete Product Component - Product ID to be deleted is having id = {product_id} and product name is = {params.name}</h1>

        {/* what if now 2 things are coming in url like id and name, then params object is going to have 2 key values */}
      
    </div>
  )
}

export default DeleteProduct
