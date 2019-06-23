import React from 'react';
import { Link } from 'react-router-dom';

import './NoContacts.css'

const nocontacts = (props) =>{

  return (
    <div className='NoContacts'>
      <h4>There are no contacts.</h4>
      <Link className='NavButton' to='/addForm'>Add Contact</Link>
    </div>
  )

}


export default nocontacts;