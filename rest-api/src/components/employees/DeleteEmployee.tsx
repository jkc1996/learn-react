import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EmployeeService } from '../../services/EmployeeService';

type params_type = {
    eid: string
}
function DeleteEmployee() {
    // just mentioned the type of params while using useParams hook
    const params = useParams<params_type>();

    // just converting the string 'pid' to number. 
    let employee_id: number = 0;
    if(params.eid){
        employee_id = parseInt(params.eid);
    }

  // useNavigate Hook - Returns a function that lets you navigate programmatically in the browser in response to user interactions or effects.

  // The returned function signature is navigate(to, options?)/navigate(delta) where:

  // 'to' can be a string path, a To object, or a number (delta) - basically roting path
  // options contains options for modifying the navigation behavior (see NavigateOptions)
    let navigate = useNavigate();

    const deleteEmployeeById = async() => {
        // call the delete service method here
        let response = await EmployeeService.deleteEmployee(employee_id);
        console.log("deleted employee",response);
    }

    useEffect(() => {
        deleteEmployeeById();
        navigate('/'); // after deletion navigate to home page
    }, []); // empty dependency list to run only once when component is mounted
    
  return (
    <div>
        {/* now how to read data from url ? we have params hook for this,
        which - Returns an object of key/value-pairs of the dynamic params from the current URL that were matched by the routes.
        
        in our case key is - 'pid' and values s value passed to this 'pid'

        now just rememer that this 'params' is always an object and value inside this object is always 'string'

        now lets just define the type 'params_type' for this params object  */}
        <h1>Delete Employee Component - Employee ID to be deleted is {employee_id}</h1>
      
    </div>
  )
}

export default DeleteEmployee
