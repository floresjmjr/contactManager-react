import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';

import './Form.css';

import Input from '../Input/Input';


class Form extends Component {

  state = {
    contact: {
      fullName: '',
      email: '',
      phone: '',
      tags: '',  
    },
    invalidMessages: {
      fullName: '',
      email: '',
      phone: '',
    }
  }

  componentDidMount() {
    if(this.props.title === 'Edit Contact') {
      const id = this.props.location.state.id
      this.getContactInfo(id);
    }
  }

  getContactInfo = (id) =>{
    Axios.get(`https://contact-manager-jf.firebaseio.com/contacts/${id}.json`)
    .then((response)=>{
      const contactData = response.data
      this.setState({contact: contactData})
    })
  }

  validateInputs = (contactData) => {
    let invalidInputs = {isEmpty: true}
    
    //fullName validation
    if(contactData.fullName.length === 0) {
      invalidInputs.fullName = '** A name is required.'
      invalidInputs.isEmpty = false;
    } else if (contactData.fullName.length < 3) {
      invalidInputs.fullName = '** The name must contain minimum 3 letters.'
      invalidInputs.isEmpty = false;
    }
    //Phone and Email validation
    if(contactData.phone || contactData.email) {
      if (contactData.email.match(/\S+@\S+\.\S+/)) {
      } else if (contactData.phone.match(/^(\d{10}|\d{12})$/)) {
      } else {
        invalidInputs.phone = ('** The contact must have a valid phone number or email.')
        invalidInputs.email = ('** The contact must have a valid phone number or email.')
        invalidInputs.isEmpty = false;
      }
    } else {
      invalidInputs.phone = ('** The contact must contain either a phone number or email.')
      invalidInputs.email = ('** The contact must contain either a phone number or email.')
      invalidInputs.isEmpty = false;
    }

    //FormInputInvalid class itnerory
    return invalidInputs
  }

  submitContactHandler = (event) => {
    event.preventDefault();
    const contactData = {...this.state.contact};
    const invalidInputs = this.validateInputs(contactData);
    this.setState({invalidMessages: invalidInputs}, ()=>{

      if(invalidInputs.isEmpty){
        if(contactData.phone) {
          contactData.phone = this.formatPhone(contactData.phone)
        }
        if(this.props.title === 'Edit Contact'){
          this.editContact(contactData);
        } else {
          this.addContact(contactData);
        }
      } else {
        this.displayMessage();
      }

    })    
  }

  formatPhone = (phone) => {
    return `(${phone.slice(0,3)}) ${phone.slice(3)}`
  }

  displayMessage = () => {
    console.log('display message', this.state.invalidMessages);
  }

  addContact = (contactData) => {
    Axios.post('https://contact-manager-jf.firebaseio.com/contacts.json', contactData)
    .then(()=>{
      alert('Contact has been added!')
      this.props.history.push('/')
    }).catch((err)=>{console.error(err)})
  }

  editContact = (contactData) => {
    const id = this.props.location.state.id
    Axios.put(`https://contact-manager-jf.firebaseio.com/contacts/${id}.json`, contactData)
    .then(()=>{
      alert('Contact has been updated!')
      this.props.history.push('/');
    })
  }

  inputChangeHandler = (event) => {
    this.setState({invalidMessages: {}})
    const value = event.target.value;
    const name = event.target.name;
    const contact = {
      ...this.state.contact
    }
    contact[name] = value;
    this.setState({contact: contact})
  }


  render() {
      return (
        <form className='Form'>
          <h3 className='FormTitle'>{this.props.title}</h3>
          <div className='FormInputs'>
            <Input 
              changed={this.inputChangeHandler} 
              startingValue={this.state.contact.fullName} 
              labelName='Name:' 
              labelType='text'
              message={this.state.invalidMessages.fullName}
              name='fullName'/>
            <Input 
              changed={this.inputChangeHandler} 
              startingValue={this.state.contact.email} 
              labelName='Email:' 
              labelType='email'
              message={this.state.invalidMessages.email}
              name='email'/>
            <Input 
              changed={this.inputChangeHandler} 
              startingValue={this.state.contact.phone} 
              labelName='Phone:' 
              labelType='text'
              message={this.state.invalidMessages.phone}
              name='phone'/>
            <Input 
              changed={this.inputChangeHandler} 
              startingValue={this.state.contact.tags} 
              labelName='Tags:' 
              labelType='text'
              name='tags'/>
          </div>
          <div className='FormButtons'>
            <button 
              onClick={this.submitContactHandler} 
              className='FormButton'
              type='submit'>Submit</button>
            <Link className='FormButton'to='/'>Cancel</Link>
          </div>
        </form>
      )
  }

}


export default Form;