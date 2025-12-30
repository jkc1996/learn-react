import React from 'react'
type Props = {
    onChangeText: (value: string) => void;
  };
function InputChild({onChangeText}: Props) {
  return (
    <div>
      <input type="text" onChange={(e)=> {onChangeText(e.target.value)}}/>
    </div>
  )
}

export default InputChild
