import React, { useEffect, useState } from 'react'
import { EmployeeService } from '../../services/EmployeeService';
import { employee_type } from '../../models/employee';
import { Link } from 'react-router-dom';

function EmployeeDetails() {

// now lets hold the response using state variable

const [employees, setEmployees] = useState([] as employee_type[]);

  const getAllEmployees = async () => {
    let response = await EmployeeService.fetchEmployees();
    console.log(response);
    setEmployees(response); // setting the response to state variable 'employees' which we will print in the tabular format
}
// below one was just to understand useEffect with dependency_list
const [count, setCount] = useState(0);

// below hook will run only once when the component is mounted sine the dependency_list is empty []
// useEffect(() => {
//     getAllEmployees();
// }, []);

useEffect(() => {
  getAllEmployees();
}, [count]); // here the dependency_list has 'count' state variable, so whenever count changes this useEffect will run

  return (
    <div>
      <h2>Employee Details</h2>
      <p>This is the Employee Details component. check the console for employee Details.</p>

      {/* To understand the dependency_list in the use effect let's create one useState */}
      <h3>{count}</h3>
      {/* so on below button clicks useEffect will get trigged and it will call the getAllEmployees as the count variable is mentiond in the dependecy list of useEffect Hook */}
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setCount(count - 1)}>Decrement Count</button>

      <h3>Employee List</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Employee Position</th>
            <th>Employee Gender</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.gender}</td>
                {/* implementing delete functionality */}
                <td><Link to={`/employee/delete/${employee.id}`}>Delete Employee</Link></td>
                <td><Link to={`/employee/edit/${employee.id}`}>Edit Employee</Link></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeDetails
