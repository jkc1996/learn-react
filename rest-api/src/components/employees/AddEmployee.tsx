import React, { FormEvent, useReducer, useState } from 'react'
import { employee_type } from '../../models/employee';
import { EmployeeService } from '../../services/EmployeeService';
import axios from 'axios';

function AddEmployee() {
    const [employee, setEmployee] = useState<employee_type>({} as employee_type);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // as we know [e.target.name]: e.target.value this to work, it is important that the 'name' attribute of input/select should match with the keys of state object
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    }

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // the below insertEmployee will return the promise actually. it will insert the json object in the info.json - employee array.
            // we did async/await here too to get the actual inserted employee object after the promise is resolved.
            let response = await EmployeeService.insertEmployee(employee);
            console.log(response);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // API / network error
                console.error('Status:', error.response?.status);
                console.error('Response:', error.response?.data);
                console.error('Message:', error.message);

                alert(
                    error.response?.data?.message ??
                    'Failed to insert employee. Please try again.'
                );
            } else {
                // Unknown / programming error
                console.error('Unexpected error:', error);
                alert('Something went wrong.');
            }
        }
    }


    // Below code is for understanding useReducer() hook:

    // Execution flow till now:

    // Button ---> click handler ---> dispatch action ---> Reducer function (which will decide how to modify state value, based on the action received)

    const initialState: number = 0;

    const reducer = (state: number, action: string): number => {
        console.log(action);
        switch(action) {
            case 'Increment':
                return state+1
            case 'Increment':
                return state+1
            case 'Reset':
                return initialState
        }
        return initialState
    }

    const [count, dispatch] = useReducer(reducer, initialState);

    return (
        <div>

            <h3>Count: {count}</h3>
            <button onClick={() => dispatch('Increment')}>Increment</button>
            <button onClick={() => dispatch('Decrement')}>Decrement</button>
            <button onClick={() => dispatch('Reset')}>Reset</button>

            <form onSubmit={submitHandler}>
                <h2>Add Employee</h2>
                <div>
                    <label htmlFor="id">ID:</label>
                    <input type="number" id="id" name="id" required onChange={changeHandler}/>
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required onChange={changeHandler}/>
                </div>
                <div>
                    <label htmlFor="position">Position:</label>
                    <select id="position" name="position" required onChange={changeHandler}>
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
                            required
                            onChange={changeHandler}
                        />
                        Female
                    </label>
                </div>
                <button type="submit">Add Employee</button>
            </form>

        </div>
    )
}

export default AddEmployee
