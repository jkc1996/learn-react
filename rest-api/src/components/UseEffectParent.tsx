import React, { Suspense, useEffect, useState } from 'react'
//import UseEffectChild from './UseEffectChild';
const UseEffectChild = React.lazy(() => import('./UseEffectChild') );
function UseEffectParent() {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    console.log(`this is from parent. Count changed: ${count}`);
  }, [count]);
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
