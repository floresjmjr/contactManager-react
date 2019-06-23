import React from 'react';

import './Input.css'


const input = (props) =>{
  return (
    <div className='InputDiv'>
      <label className='FormLabel'>{props.labelName}</label>
      <input 
        onChange={props.changed} 
        className={'FormInput'}
        type={props.labelType} 
        value={props.startingValue}
        name={props.name}/>
      <div className="InvalidMessage">{props.message}</div>
    </div>
  )

}




export default input;