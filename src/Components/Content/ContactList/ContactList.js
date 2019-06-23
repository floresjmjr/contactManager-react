import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';


import './ContactList.css';

import NoContacts from '../NoContacts/NoContacts';
import Spinner from '../Spinner/Spinner';
import Nav from '../Nav/Nav';

class ContactList extends Component {

  state = {
    contacts: [],
    doneLoading: false,
    searchInputValue: '',
  }

  componentDidMount(){
    console.log('DidMount')
    Axios.get('https://contact-manager-jf.firebaseio.com/contacts.json')
    .then((response)=>{
      let contactList = [];
      if(response.data) {
        for(let key in response.data) {
          contactList.push({ id: key, ...response.data[key]})
        }
      }

      contactList = contactList.sort((contact1, contact2)=>{
        if (contact1.fullName < contact2.fullName){ return -1 }
        if (contact1.fullName > contact2.fullName){ return 1 }
        return 0;
      })
      this.setState({contacts: contactList, doneLoading: true})

    })
  }

  searchInputHandler = (event) => {
    const searchValue = event.target.value.toLowerCase();
    this.setState({searchInputValue: searchValue})
  }

  
  deleteContactHandler = (id) =>{
    Axios.delete(`https://contact-manager-jf.firebaseio.com/contacts/${id}.json`)
    const contactList = this.state.contacts.filter((contact)=>{
      return contact.id !== id
    });
    this.setState({contacts: contactList})
  }

  searchContactList = () => {
    return this.state.contacts.filter((contact)=>{
      const name = contact.fullName.toLowerCase().includes(this.state.searchInputValue)
      const tags = contact.tags.toLowerCase().includes(this.state.searchInputValue)
      const email = contact.email.toLowerCase().includes(this.state.searchInputValue)
      return name || tags || email;
    });
  }


  render() {
    let contacts;
    let contactList;
    if(this.state.doneLoading) {
      if(this.state.contacts.length) {
        if(this.state.searchInputValue) {
          contactList = this.searchContactList();
        } else {
          contactList = this.state.contacts;
        }
        
        contacts = contactList.map(contact=>{
        
          return (
            <div className='Contact' key={contact.id}>
              <h5>{contact.fullName}</h5>
              <dl>
                <dt>Phone Number:</dt>
                <dd>{contact.phone}</dd>
                <dt>Email:</dt>
                <dd>{contact.email}</dd>
                <dt>Tags:</dt>
                <dd>{contact.tags}</dd>
              </dl>
              <div className='ContactButtons'>
                <Link
                  className='ContactButton' 
                  to={{ pathname: '/editForm', state: {id: contact.id}}}>
                  Edit</Link>
                <button 
                  className='ContactButton' 
                  onClick={()=>{this.deleteContactHandler(contact.id)}}>
                Delete</button>
              </div>
            </div>
          )
        })
      } else {
        contacts = <NoContacts/>
      }
    } else {
      contacts = <Spinner/>
    }

    return (
      <div>
        <Nav searchChange={this.searchInputHandler.bind(this)} />
        <div className='ContactList'>
          {contacts}
        </div>
      </div>
    )
  
  }


}




export default ContactList;


