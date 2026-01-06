import React, { useEffect, useState } from 'react'
import UseEffectChild from './UseEffectChild';

function UseEffectParent() {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    console.log(`this is from parent. Count changed: ${count}`);
  }, [count]);
  return (
    <div>
        <UseEffectChild count = {count}/>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  )
}

export default UseEffectParent
