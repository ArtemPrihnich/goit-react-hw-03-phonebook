import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import { Button, Form, Input, Label } from './ContactsForm.styled';
import PropTypes from 'prop-types'

export default class ContactsForm extends Component {
    state = {
        name: '',
        number: ''
    }

    contactNameInpuId = nanoid();
    contactNumberInputId = nanoid();

    handleChange = (e) => {
        const { name, value } = e.currentTarget
        this.setState({ [name]: value })
    };

    handleSubmit = (e) => {
        const { name, number } = this.state
        e.preventDefault();
        this.props.onSubmit({ name, number })
        this.setState({
            name: '',
            number: ''
        })
    }

    render() {
        const { handleSubmit, handleChange, contactNameInpuId, contactNumberInputId } = this
        const { name, number } = this.state
        return (
            <Form onSubmit={handleSubmit}>
                <Label htmlFor={contactNameInpuId}>Name</Label>
                <Input
                    type="text"
                    name="name"
                    value={name}
                    id={contactNameInpuId}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    placeholder='Taras Shevchenko'
                    onChange={handleChange}
                />
                <Label htmlFor={contactNumberInputId}>Phone Number</Label>
                <Input
                    type="tel"
                    name="number"
                    value={number}
                    id={contactNumberInputId}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    placeholder='+38 (012) 345 67 89'
                    onChange={handleChange}
                />
                <Button>Add Contact</Button>
            </Form>
        )
    }
}

ContactsForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}