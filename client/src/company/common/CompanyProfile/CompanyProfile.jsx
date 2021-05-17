import React from 'react';
import companyLogo from '../../../assets/images/dashboard/PlusLogoCompany.png'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import FormInput from '../../../common/form-input/FormInput';
import CustomButton from '../../../common/custom-button/CustomButton';
import { addCompanyThunk, editCompanyThunk } from '../../redux/company-thunk';
import { Col, Container, Row } from 'react-bootstrap';



const CompanyProfile = ({setActiveSection,setPopUpOpen,company, editMode,...props}) => {

    const dispatch = useDispatch();

    const initialValues = {
        imageURL: editMode ? company.imageURL : '',
        name: editMode ? company.name : '',
        description: editMode ? company.description : '',
    };

    const validationSchema = Yup.object().shape({
        imageURL: Yup
            .string("Please enter a valid image URL")
            .required("This field is required")
            .test("check-is-image-URL:", "Invalid image Url", (url) => {
                return (url ? url.match(/\.(jpeg|svg|jpg|gif|png)$/) != null : null);
            }),
        name: Yup
            .string("Please enter a valid name")
            .required("This field is required"),
        description: Yup
            .string("Please enter a valid name")
            .required("This field is required"),
    })



    const handleSubmitProfile = (values,formProps) => {
            if(editMode){
                dispatch(editCompanyThunk(values,company._id,formProps.setErrors));
                setPopUpOpen(false);
            }else{
                dispatch(addCompanyThunk(values,formProps.setErrors))
            }
            setActiveSection("Services")
            formProps.resetForm();

    }
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmitProfile} validationSchema={validationSchema}>
            {
                formProps => {
                    return (
                        <Form>
                        <Container fluid>

                        <Row>

                            <Col xs={12} lg={6}>
                                <div>
                                    <Field
                                        component={FormInput} 
                                        label="Link to image" 
                                        type="text"
                                        name="imageURL" 
                                        inputname="Image URL"
                                       />
                                </div>

                                    <div  style={{ backgroundImage: `url(${!formProps.errors.imageURL && formProps.values.imageURL.length > 0 ? formProps.values.imageURL :  companyLogo})`}} className="profile_logo_image" alt="LOGO" />
                            </Col>

                            
                            <Col xs={12} lg={6}>
                                <Field
                                    component={FormInput} 
                                    label="Company Name" 
                                    type="text"
                                    name="name" 
                                    inputname="Name" 
                                   />
                                <Field
                                    component={FormInput} 
                                    label="Company Description" 
                                    type="textarea"
                                    name="description" 
                                    inputname="Description" 
                                   />

                            </Col>

                                <CustomButton type="submit" >Save Company</CustomButton>
                                    </Row>
                                    </Container>
                        </Form>
                    )
                }
            }
        </Formik>
    )
}

export default CompanyProfile;
