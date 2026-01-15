import axios from "axios";
import { employee_type } from "../models/employee";

export class EmployeeService {
    // static insertEmployee = (employee: employee_type) => {
    //     // Make a POST request to insert a new employee. which is promise based
    //     let response = axios.post("http://localhost:3000/employees", employee)
    //     console.log("Employee inserted:", response.data); // this one is promise
    // }

    // why Promise<> as return type ?
    //because axios.post is promise based function it will return a promise which will resolve to the actual employee object once the request is completed.
    // Basically asyc always returns Promise..

    static insertEmployee = async (employee: employee_type): Promise<employee_type> => {
        try {
        // Make a POST request to insert a new employee. but we want acual object here not a promise so we use async/await
        let response = await axios.post("http://localhost:3000/employees", employee)
        console.log("Employee inserted:", response.data);
        return response.data; // return the actual inserted employee object
        } catch(error) {
            console.error('API error while inserting employee', error);
            throw error; // rethrow so caller can handle
        }
    }

    // get all employees
    // why Promise<employee_type[]> ? - because we are returning an array of employee objects once the promise is resolved.
    static fetchEmployees = async (): Promise<employee_type[]> => {
        let response = await axios.get("http://localhost:3000/employees");
        console.log("Employees fetched:", response.data);
        return response.data; // return the actual array of employees 
    }

    // Delete employee by id
    static deleteEmployee = async (employeeId: number): Promise<employee_type> => {
        let response = await axios.delete(`http://localhost:3000/employees/${employeeId}`);
        console.log(`Employee with ID ${employeeId} deleted.`);
        return response.data; // return the deleted employee object
    }

    static fetchEmployeeById = async (employeeId: number): Promise<employee_type> => {
        let response = await axios.get(`http://localhost:3000/employees/${employeeId}`);
        console.log(`Employee with ID ${employeeId} fetched:`, response.data);
        return response.data; // return the fetched employee object
    }

    static updateEmployee = async (employee: employee_type): Promise<employee_type> => {
        let response = await axios.put(`http://localhost:3000/employees/${employee.id}`, employee);
        console.log(`Employee with ID ${employee.id} updated:`, response.data);
        return response.data; // return the updated employee object
    }
}