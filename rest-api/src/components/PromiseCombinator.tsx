import React, { useEffect, useState } from 'react'
import { employee_type } from '../models/employee';
import { EmployeeService } from '../services/EmployeeService';
import { ProductService } from '../services/ProductService';
import { Product } from '../models/product';

// When to use - Promise.all - it is actually "all" or "nothing".. if one of the api fails.. everything results into failure...

// ✔ APIs are independent
// ✔ You want them in parallel
// ✔ UI depends on both results

//----------------------------------------

// Promise.allSettled is exactly the right tool when you want partial success instead of all-or-nothing.

// It waits for ALL promises to finish,
// never throws,
// returns the status of each promise.

// each rusult is:

// { status: 'fulfilled', value: data }
// // OR
// { status: 'rejected', reason: error }

// ---------------------------------------

// Both Promise.all and Promise.allSettled run promises in PARALLEL.
// Neither of them is sequential.

// --------------------------------------

// let say API-2 deepnds on the value coming from API-1.. then in that case we need to go sequential

// first do this ---> const user = await UserService.fetchUser();
// then do this ---> const orders = await OrderService.fetchOrders(user.id);

function PromiseCombinator() {
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState<employee_type[]>([] as employee_type[]);
    const [products, setProduct] = useState<Product[]>([] as Product[])
    // useEffect(()=>{
    //     let isMounted = true;
    //     const controller = new AbortController();
    //     const loadData = async () => {
    //         try {
    //             setLoading(true);
    //             const [fetchedemployees, fetchedProducts] = await Promise.all([EmployeeService.fetchEmployees(), ProductService.fetchProducts(controller.signal)])
    //             setEmployees(fetchedemployees);
    //             setProduct(fetchedProducts);
    //         } catch (error) {
    //             console.error('Failed to load page data', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }

    //     loadData();

    //     return () => {
    //         isMounted = false;
    //         controller.abort();
    //     };
    // },[])

    useEffect(() => {
        const loadData = async () => {
        setLoading(true);
        const controller = new AbortController();

        const results = await Promise.allSettled([
        EmployeeService.fetchEmployees(),
        ProductService.fetchProducts(controller.signal),
        ]);

        const [employeesResult, productsResult] = results;

        if (employeesResult.status === 'fulfilled') {
        setEmployees(employeesResult.value);
        } else {
        console.error('Employees failed:', employeesResult.reason);
        //setEmployeeError('Failed to load employees');
        }

        if (productsResult.status === 'fulfilled') {
        setProduct(productsResult.value);
        } else {
        console.error('Products failed:', productsResult.reason);
        //setProductError('Failed to load products');
        }

        setLoading(false);
    };

    loadData();
    }, []);

  return (
    <>
    <div>PromiseCombinator</div>
    <div>Product list</div>
    <div>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <span>{product.brand}</span>
            <span>{product.name}</span>
          </div>
        );
      })}

      <br/>
      <div>Employee list</div>
      <div>
        {employees.map((employee) => {
            return (
                <div key = {employee.id}>
                  <span>{employee.name}</span>
                  <span>{employee.gender}</span>
                </div>
            );
        })}
      </div>
    </div>
  </>
  )
}

export default PromiseCombinator