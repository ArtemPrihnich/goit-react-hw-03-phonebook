import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ContactsFormFormik from 'components/ContactsForm/ContactsFormFormik';
import ContactsList from '../ContactsList/ContactsList';
import ContactsFilter from '../ContactsFilter/ContactsFilter';
import { Box } from './App.styled';


export default class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.lenght !== this.state.contacts.length) {
      return localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  componentDidMount() {
    const localStorageContacts = JSON.parse(localStorage.getItem('contacts'))
    if (localStorageContacts?.length > 0) {
      this.setState({ contacts: [...localStorageContacts] })
    }
  }

  addContact = (contact) => {
    if (this.onDuplicatingName(contact)) {
      return Notify.failure(`This contact: (${contact.name}) is already in your contact book`);
    }
    this.setState((prev) => {
      const newContact = {
        id: nanoid(),
        ...contact
      };
      return {
        contacts: [...prev.contacts, newContact]
      }
    })
  }

  handleChange = (e) => {
    const { name, value } = e.currentTarget
    this.setState({ [name]: value })
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state
    if (!filter) {
      return contacts
    }

    const filteredContacts = contacts.filter(({ name, number }) => {
      const result = name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || number.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      return result
    })
    return filteredContacts
  }

  onDuplicatingName = ({ name }) => {
    const { contacts } = this.state
    const result = contacts.find(contact => {
      return contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    })
    return result
  }

  deleteContact = (id) => {
    this.setState((prevState) => {
      const newContacts = prevState.contacts.filter(contact => {
        return contact.id !== id
      })
      return {
        contacts: newContacts
      }
    })
  }

  render() {
    const { addContact, deleteContact, handleChange } = this
    const contacts = this.getFilteredContacts()
    return (
      <Box>
        <ContactsFormFormik onSubmit={addContact} />
        <ContactsFilter inputChange={handleChange} filterValue={this.state.filter} />
        <ContactsList contacts={contacts} onDelete={deleteContact} />
      </Box >
    )
  }
}

