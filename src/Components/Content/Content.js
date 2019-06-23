import React, { Component } from 'react';
import { Route } from 'react-router-dom'; 

import './Content.css'

import ContactList from './ContactList/ContactList';
import Form from './Form/Form';


class Content extends Component {



  render() {
    return (
      <div>
        <Route 
          path='/' exact 
          render={(props)=>{ return <ContactList className='Fade' {...props} />
          }}/>
        <Route 
          path='/addForm' 
          render={(props)=> <Form {...props} title='Add Contact' />}
        />
        <Route 
          path='/editForm' 
          render={(props)=> <Form {...props} title='Edit Contact' />}
        />
      </div>
    )
  
  }

}



export default Content;