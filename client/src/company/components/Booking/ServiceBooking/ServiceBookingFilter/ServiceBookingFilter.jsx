import { Field, Form, Formik } from 'formik';
import React from 'react';
import CustomButton from '../../../../../common/custom-button/CustomButton';
import { Container } from 'react-bootstrap';
const ServiceBookingFilter = ({ setPopUpOpen,selectServiceOptions,selectTimeOptions, setBookingFilterData, bookingFilterData, ...props }) => {

    const initialValues = {
        service:  "" ,
        time: ""
    }

    const handleSubmit = (value, formProps)=>{
        setPopUpOpen(false)
        setBookingFilterData(value)
    }

    return (
        <Container fluid className="filter_form_container">

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form >
            <div className="option_menu_title">Service</div>
            <Field className="filter_select_input" as="select" name="service">
            <option value={""}></option>
             {
                selectServiceOptions.map(serviceName => <option  key={serviceName} value={serviceName}>{serviceName}</option> )
             }
           </Field>

            <div className="option_menu_title">Booking time</div>
            <Field className="filter_select_input" as="select" name="time">
            <option value={""}></option>
            {
                selectTimeOptions.map(serviceTime => <option key={serviceTime} value={serviceTime}>{serviceTime}</option> )
             }
           </Field>

            <div className="filter_btn_container">
            <CustomButton type="submit" profilebtn>Apply filter</CustomButton>
            </div>
            </Form>
        </Formik>
                </Container>
    )
}
export default ServiceBookingFilter