import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import AddProduct from '../products/AddProduct'
import DeleteProduct from '../products/DeleteProduct'
import ProductDetails from '../products/ProductDetails'
import AddEmployee from '../employees/AddEmployee'
import DeleteEmployee from '../employees/DeleteEmployee'
import EmployeeDetails from '../employees/EmployeeDetails'
import NotFound from './NotFound'
import EditEmployee from '../employees/EditEmployee'
import AddEmployeever2 from '../employees/AddEmployeever2'
import Parent from '../Parent'
import ParentStateLifting from '../ParentStateLifting'
import UseContextDemo from '../UseContextDemo'
import UseEffectParent from '../UseEffectParent'
import UseCallbackDemo from '../UseCallBackDemo'
import ProductDashboard from '../useMemoDemo'

function Nav() {
  return (
    <div>
      <BrowserRouter>
      <div className="navbar">
        <Link to='product/add'>Add Product</Link>
        <Link to='product/delete'>Delete Product</Link>
        <Link to='product/details'>Product Details</Link>
      </div>
      <div className="navbar">
        <Link to='employee/add'>Add Employee</Link>
        <Link to='employee/addver2'>Add Employee(useReducer concept)</Link>
        {/* commenting down below line as we will go to the delete component from the employee details page */}
        {/* <Link to='employee/delete'>Delete Employee</Link> */}

        {/* Creating home path which leads to employee details component */}
        <Link to='/'>Home</Link>
        {/* <Link to='employee/details'>Employee Details</Link> */}
      </div>
      <Link to='communication'>Parent-child</Link>
      <Link to='lift-state-up'>State Lifting</Link>
      <Link to='use-context'>Use Context Demo</Link>
      <Link to='use-effect-parent'>Use Effect Demo</Link>
      <Link to='use-callback-parent'>Use Callback Demo</Link>
      <Link to='use-memo-example'>Use Memo Demo</Link>
      <Link to='forward-ref-demo'>Forward Ref Demo</Link>
        <Routes>
            {/* <Route path='product/add' Component={AddProduct}></Route>
            <Route path='product/delete' Component={DeleteProduct}></Route>
            <Route path='product/details' Component={ProductDetails}></Route> */}

            {/* defining default path '/' here */}

            <Route path='/' Component={EmployeeDetails}></Route>

            {/* Wild card route - 404 page not found */}

            <Route path='*' Component={NotFound}></Route>


            {/* Instead of above thing we can introduce, Parent Route concept as below*/}
            <Route path='product'>
                <Route path='add' Component={AddProduct}></Route>
                {/* <Route path='delete/:pid' Component={DeleteProduct}></Route> */}
                {/* Now lets send 2 things in url like id and name */}
                <Route path='delete/:pid/:name' Component={DeleteProduct}></Route>
                <Route path='details' Component={ProductDetails}></Route>
            </Route>
            <Route path='employee'>
                <Route path='add' Component={AddEmployee}></Route>

                {/* below path is to understand the form with reducer concept */}
                <Route path='addver2' Component={AddEmployeever2}></Route>

                <Route path='delete/:eid' Component={DeleteEmployee}></Route>
                {/* COMMENTING BELOW AS I WANT TO put the details component on my default '/' path */}
                {/* <Route path='details' Component={EmployeeDetails}></Route> */}

                {/* Edit employee path */}

                <Route path='edit/:eid' Component={EditEmployee}></Route>
            </Route>
            <Route path='communication' Component={Parent}></Route>
            <Route path='lift-state-up' Component={ParentStateLifting}></Route>
            <Route path='use-context' Component={UseContextDemo}></Route>
            <Route path='use-effect-parent' Component={UseEffectParent}></Route>
            <Route path='use-callback-parent' Component={UseCallbackDemo}></Route>
            <Route path='use-memo-example' Component={ProductDashboard}></Route>
            <Route path='forward-ref-demo' Component={React.lazy(() => import('../ForwardRefDemo'))}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Nav
