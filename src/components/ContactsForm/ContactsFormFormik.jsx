import React from 'react'
import { nanoid } from 'nanoid'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Button, FormStyle, Input, Label, Error } from './ContactsForm.styled';

const initialValues = {
    name: '',
    number: ''
}

const schema = yup.object().shape({
    name: yup.string().min(6).max(20).required(),
    number: yup.number().typeError('contact must include numbers only').positive("A phone number can't start with a minus").integer("A phone number can't include a decimal point").required()
})

export default function ContactsFormFormik({ onSubmit }) {
    const contactNameInpuId = nanoid();
    const contactNumberInputId = nanoid();

    const handleSubmit = (values, { resetForm }) => {
        const { name, number } = values
        onSubmit({ name, number })
        resetForm()
    }

    return (
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
            <FormStyle autoComplete='off'>
                <Label htmlFor={contactNameInpuId}>Name</Label>
                <Input
                    type="text"
                    name="name"
                    id={contactNameInpuId}
                    placeholder='Taras Shevchenko'
                />
                <Error name="name" component='p' />
                <Label htmlFor={contactNumberInputId}>Phone Number</Label>
                <Input
                    type="tel"
                    name="number"
                    id={contactNumberInputId}
                    placeholder='+38 (012) 345 67 89'
                />
                <Error name="number" component='p' />
                <Button type='submit'>Add Contact</Button>
            </FormStyle>
        </Formik>
    )
}
