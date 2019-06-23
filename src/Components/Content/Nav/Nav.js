import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.css';

const nav = (props) => {
  return (
    <nav className='Nav'>
      <div className='NavContainer'>
        <NavLink to='/addForm' className='NavButton'>Add Contact</NavLink>
      </div>
      <div className='NavContainer'>
        <input onChange={props.searchChange}className='SearchInput' type='text' name='searchBox' placeholder='Search'/> 
      </div>
    </nav>
  )
}




export default nav;