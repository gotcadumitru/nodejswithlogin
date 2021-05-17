import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import forgotImage from '../../../assets/images/auth/forgotimage.png';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import FormInput from '../../../common/form-input/FormInput';
import CustomButton from '../../../common/custom-button/CustomButton';
import { useDispatch } from 'react-redux';
import { forgotPasswordThunk } from '../../redux/user-thunk';


const ForgotPassword = (props) => {


    const dispatch = useDispatch();
    const history = useHistory();
    const initialValues = {
        email: '',
        auth:''
    }
    const validationSchema = Yup.object().shape({
        email: Yup
            .string()
            .email("Please enter valid email")
            .required("This field is requird"),
    })

    const handleSubmit =(value, {setErrors})=>{
        const {email} = value;
        dispatch(forgotPasswordThunk(email)).then(response=>{

            alert(response.text);
            history.push("/auth/login");
        }).catch(err =>{
        
            const error = err?.response?.data?.error;
            setErrors({auth: error});
        })
    }

    return (
        
        <div className="auth_component">
        <div className="forgot_pass_img">
        <img src={forgotImage} alt="Forgot Password"/>
        </div>
        <h2 className="auth_form_title">Reset password</h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            <Form >

                <Field 
                    component={FormInput}
                    name="email" 
                    inputname="Email"  
                    label="yourmail@mail.com"
                />
                <ErrorMessage name="auth"  className="error_message"  component="div"/>
                <br/>
                <CustomButton type="submit">Send Email</CustomButton>
            </Form>
        </Formik>
            <div className="auth_links"> 
            Go back to
            <Link to="/auth/login">  Log In</Link>
            </div>

        </div>
    )
}
export default ForgotPassword;