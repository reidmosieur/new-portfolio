import React, { FormEvent, useState } from 'react';
import Button from "@/components/button";
import Input from '@/components/input';
import createNewContact from '../helpers/createNewContact';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
       .required('First name is required'),
    email: Yup.string()
       .email('Invalid email address')
       .required('Email is required'),
   });

const CustomForm = () => {
    const [submitting, setSubmitting] = useState(false);

    const [messageIsFocused, setMessageIsFocused] = useState(false);

    const [resultState, setResultState] = useState('');

    const handleMessageIsFocused = () => {
        setMessageIsFocused(true);
    };

    const handleMessageBlur = () => {
        setMessageIsFocused(false);
    };

    const handleSubmit = (values: any) => {
        const {
            email,
            firstName,
            lastName,
            message,
        } = values;

        setSubmitting(true);
        createNewContact({ email, firstName, lastName, message })
        .then((result: any) => {
            setResultState(result.status)
            setSubmitting(false);
        });
    }

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                message: '',
            }}
            validationSchema={validationSchema}
            validateOnBlur={true}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ errors, touched, setValues, values }) => (
                <Form
                    className="max-w-md p-8 flex flex-col flex-wrap gap-2 bg-stone-900 text-stone-200"
                >
                    {!resultState &&
                        <>
                            <h2 className="pb-6 text-lg sm:text-xl lg:text-2xl font-bold">Like what you see? Let&apos;s get in touch!</h2>
                            <Input 
                                inputValue={values.email} 
                                setInputValue={(value: string) => {
                                    setValues({...values, email: value });
                                }} 
                                label={'Email*'} 
                                hint={'reid@reidmosieur.dev'}
                                error={errors.email ? true : false}
                                errorText={errors.email}
                                disabled={submitting}
                            />
                            <Input 
                                inputValue={values.firstName} 
                                setInputValue={(value: string) => {
                                    setValues({...values, firstName: value });
                                }} 
                                label={'First Name*'} 
                                hint={'Reid'}
                                error={errors.firstName ? true : false}
                                errorText={errors.firstName}
                                disabled={submitting}
                            />
                            <Input 
                                inputValue={values.lastName} 
                                setInputValue={(value: string) => {
                                    setValues({...values, lastName: value });
                                }} 
                                label={'Last Name'} 
                                hint={'Mosieur'}
                                disabled={submitting}
                            />
                            <div className={`relative flex flex-col flex-wrap gap-1`}>
                                <span 
                                    className={`absolute left-2 transition-all duration-200 ${messageIsFocused || values.message ? '-top-7' : 'text-stone-900 top-1'}`}
                                >
                                    Message
                                </span>
                                <textarea 
                                    value={values.message}
                                    onChange={(e) => setValues({...values, message: e.target.value })}
                                    onFocus={handleMessageIsFocused}
                                    onBlur={handleMessageBlur}
                                    cols={25} 
                                    rows={5} 
                                    className={`rounded ${submitting ? 'bg-stone-300' : 'bg-stone-200'} text-stone-900 p-2`}
                                    disabled={submitting}
                                />
                                <small className="ml-2">Hey Reid, you&apos;re so awesome! Come work for us :)</small>
                            </div>
                            <Button
                                content={"Submit"}
                                buttonType="primary"
                                type='submit'
                                submitting={submitting}
                            />
                        </>
                    }
                    {resultState === 'success' && <p  className='text-lg sm:text-xl lg:text-2xl font-bold'>Thanks! You&apos;ll hear from me soon!</p>}
                </Form>
            )}
        </Formik>
    );
};

export default CustomForm;