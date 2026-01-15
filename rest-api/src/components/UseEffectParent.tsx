import React, { Suspense, useEffect, useState } from 'react'
//import UseEffectChild from './UseEffectChild';
const UseEffectChild = React.lazy(() => import('./UseEffectChild') );
function UseEffectParent() {
  const [count, setCount] = useState<number>(0);
  useEffect((()=>{
    console.log("i am from paren with no dependency"); // even when we will change the count this one will get rendered as we have not mentione [] or any other dependency
  }));
  useEffect(() => {
    console.log(`this is from parent. Count changed: ${count}`); // onpage load render order 1
  }, [count]);
    useEffect(() => {
    console.log('Effect 1'); // onpage load render order 2
    return () => console.log('Cleanup 1'); // in case of unmount(like moving away from component), this will execute. order - 1
  }, []);

  useEffect(() => {
    console.log('Effect 2'); // onpage load render order 3
    return () => console.log('Cleanup 2'); // in case of unmount(like moving away from component), this will execute. order - 1
  }, []);
  useEffect(()=>{
    setTimeout(()=>{
      console.log("I am useeffect with timeout");
      setCount(count + 1) // here in this case, count vause gets increased to 1 after 1 second.. even if i put this useeffect on top, it will be executed later.. as t is having timeout 
    },1000)
  },[])
  
  return (
    <div>
        <Suspense fallback={<div>Loading...</div>}>
            <UseEffectChild count = {count}/>
        </Suspense>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  )
}

export default UseEffectParent
