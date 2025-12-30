

// here in react we follow export default, insted of named export like --- export function EmployeeDetails() {}

// As we want our child to accepts the value from the parent, we will pass as the function parameter here..
// Now see we are using type script here, means everything should be typed.. so lets create one type here

type props_type = {
    emp_name: string,
    email_id?: string,
    age: number
}
function EmployeeDetails (props: props_type) {
    return (
    <><h1>!!! Employee Details</h1>
    <h3>Employee Name: {props.emp_name}</h3>
    <h3>Employee Detail: {props.email_id}</h3>
    <h3>Age: {props.age}</h3>
    </>
    )
}

export default EmployeeDetails;