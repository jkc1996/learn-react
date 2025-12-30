import React, { useReducer } from 'react'

// now let's define the type of action object. here we are sending 'type', 'field' and 'value' in the action object. and one more possibility is RESET action
// so here we are saying that there are 2 possibiltys for action object.
// one is SET_FIELD type action with optional field and value properties, and another is RESET type action with no additional properties.
type action_type = {
    type: 'SET_FIELD'
    field?: string,
    value?: string
} | { type: 'RESET' }

type employee_type = {
    name: string,
    email: string
}

// initial state
const employee = {
    name: '',
    email: ''
}

//in below reducer function, we are defining how the state will be modified based on the action received.
// so this reducer actually modifies the state and returns the modified state. where state is the current state (employee_info) value and action is the object which is dispatched from the component.

const reducer = (state: employee_type, action: action_type) => {
    switch(action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.field as string]: action.value // return new object with updated field
            }
        case 'RESET':
            return employee; // resetting to initial state
        default:
            return state;
    }
}

function AddEmployeever2() {

// here employee_info is the state object which will always have the latest state value. that is why it is mapped with 'value' attribute of input fields.
const [employee_info, dispatch] = useReducer(reducer, employee);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Below dispatch is purely custom made. this time we are sending an object as action to the reducer function.
    dispatch({
        type: 'SET_FIELD', // action type
        field: e.target.name,
        value: e.target.value
    })
}

const resetHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: 'RESET' });
}
const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Employee Info Submitted:", employee_info);
}
  return (
    <div>
      <form onSubmit={submitHandler}>
        <h2>Add Employee - Version 2 - using reducer concept</h2>
        <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={employee_info.name} required onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={employee_info.email} required onChange={handleChange} />
        </div>
        <button type="submit">Add Employee</button>
        <button onClick={resetHandler}>Reset form</button>
      </form>
    </div>
  )
}

export default AddEmployeever2
