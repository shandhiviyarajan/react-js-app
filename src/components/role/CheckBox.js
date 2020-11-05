
import React from 'react'

export const CheckBox = props => {
    return (
      <li>
       <input key={props.id} onClick={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} name={props.name}/> {props.name}
      </li>
    )
}

export default CheckBox