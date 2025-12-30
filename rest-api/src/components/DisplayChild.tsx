import React from 'react'
type Props = {
    value: string;
  };

function DisplayChild({value}: Props) {
  return (
    <div>
        <p>You typed: {value}</p>
    </div>
  )
}

export default DisplayChild
