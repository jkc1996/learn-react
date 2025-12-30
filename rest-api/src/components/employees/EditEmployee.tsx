import React, { FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { EmployeeService } from '../../services/EmployeeService';
import { employee_type } from '../../models/employee';

type param_type = {
    eid: string
}
function EditEmployee() {

    let navigate = useNavigate();

    const [employee, setEmployee] = useState({} as employee_type);

    const params = useParams<param_type>();

    let employee_id: number = 0;
    if(params.eid){
        employee_id = parseInt(params.eid);
    }

    const fetchEmployeeById = async() => {
        let response = await EmployeeService.fetchEmployeeById(employee_id);
        setEmployee(response);
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    }

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let response = await EmployeeService.updateEmployee(employee);
        console.log(response);
        // below one will be the updated employee
        console.log(employee);
        navigate('/'); // after update navigate to home page
        
    }

    useEffect(() => {
        fetchEmployeeById();
    }, []);

  return (
    <div>
            <form onSubmit={submitHandler}>
                <h2>Edit Employee</h2>
                <div>
                    <label htmlFor="id">ID:</label>
                    <input type="number" id="id" name="id"  value={employee.id} required readOnly onChange={changeHandler}/>
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={employee.name} required onChange={changeHandler}/>
                </div>
                <div>
                    <label htmlFor="position">Position:</label>
                    <select id="position" name="position" value={employee.position} required onChange={changeHandler}>
                        <option value="">Select Position</option>
                        <option value="manager">Manager</option>
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                    </select>
                </div>
                <div>
                    <p>Gender:</p>

                    <label htmlFor="gender-male">
                        <input
                            type="radio"
                            id="gender-male"
                            name="gender"
                            value="male"
                            checked={employee.gender === 'male'}
                            required
                            onChange={changeHandler}
                        />
                        Male
                    </label>

                    <label htmlFor="gender-female" style={{ marginLeft: "10px" }}>
                        <input
                            type="radio"
                            id="gender-female"
                            name="gender"
                            value="female"
                            checked={employee.gender === 'female'}
                            required
                            onChange={changeHandler}
                        />
                        Female
                    </label>
                </div>
                <button type="submit">Update Employee Details</button>
            </form>

        </div>
  )
}

export default EditEmployee
