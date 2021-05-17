import {  Field, Form, Formik } from 'formik';
import React from 'react';
import FormInput from '../../../common/form-input/FormInput';
import * as Yup from 'yup';
import CustomButton from '../../../common/custom-button/CustomButton';

const ReservationGuestInfoPopUp =({companyWithService,handleSubmitUserInfo, isPopUpOpen,...props}) =>{
    const initialValues = {
        firstName: "",
        lastName: "",
        phone: '',
        email: '',
    }
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("This field is required"),
        lastName: Yup.string().required("This field is required"),
        phone: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid').required("This field is required"),
        email: Yup.string().email("Invalid email adress").required("This field is required"),
    })

    return (
        <div className="guest_form_data_container">
            {companyWithService && <Formik onSubmit={handleSubmitUserInfo} validationSchema={validationSchema} initialValues={initialValues}>
                {
                    formProps =>{
                        
                        return (

                            <Form >
                            <div>

                                <Field
                                    component={FormInput}
                                    type="text"
                                    name="firstName"
                                    label="John"
                                    inputname="First name"
                               />
                                <Field
                                    component={FormInput}
                                    type="text"
                                    name="lastName"
                                    label="Doe"
                                    inputname="Last name"
                               />
                                <Field
                                    component={FormInput}
                                    type="text"
                                    name="phone"
                                    label="+41XXXXXXXX"
                                    inputname="Phone"
                               />
                                <Field
                                    component={FormInput}
                                    type="email"
                                    name="email"
                                    label="yourmail@mail.com"
                                    inputname="Email"
                               />

                             
                            </div>                            
                            <div className="book_btns">
                            <CustomButton type="submit">Submit Information</CustomButton>

                            </div>
                            </Form>
                        )
                    }
                }
            </Formik>}
        </div>

    )
}

export default ReservationGuestInfoPopUp;