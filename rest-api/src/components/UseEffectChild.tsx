import React, { use, useEffect } from 'react'

type childProps = {
  count: number
}

function UseEffectChild( props: childProps ) {
  console.log("Child is rendering..."); // this will get consoled everytime the component renders

  useEffect(() => {
      // 2. This runs ONLY ONCE (Proof of Mount)
      console.log("Child component MOUNTED (I run only once)");
  }, []); // <--- This empty array blocks it from running on updates, even if the component re-renders like if the count chnages then also this will not run again irrrespactive of whether we use React.memo or not.

  useEffect(() => {
    // 2. This runs ONLY ONCE (Proof of Mount)
    console.log("Props passed in this one to useEffect");
  }, [props.count]); // <--- This array with props.count means run only when props.count changes

  useEffect(() => {
      // 3. This runs EVERY time (Proof of Update)
      console.log("Child component UPDATED (I run every render)");
  }); // <--- No array means run on every render... but but let's say this compnent is not receving any props from parent and we have uncommented the useMemo in export default line, then this useEffect will not run on every render as the component will not re-render
  return (
    <div>
      <h1>child component</h1>
      <h3>count value(this is from child): {props.count}</h3>
    </div>
  )
}

export default UseEffectChild

//export default React.memo(UseEffectChild)

// React.memo will prevent the child component from re-rendering unless its "props" change. so basically only when the "count" value changes here.
