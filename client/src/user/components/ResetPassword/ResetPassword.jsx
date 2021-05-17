import React from 'react'
import { Link, useHistory, useRouteMatch} from 'react-router-dom';
import forgotImage from '../../../assets/images/auth/forgotimage.png';
import FormInput from '../../../common/form-input/FormInput';
import CustomButton from '../../../common/custom-button/CustomButton';
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { resetPasswordThunk } from '../../redux/user-thunk';



const ResetPassword = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();
    
    const initialValues = {
        password: '',
        auth:'',

    }
    const validationSchema = Yup.object().shape({
        password: Yup
            .string()
            .required('Please Enter your password')
            .min(6, 'Min length: 6 Characters')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain: One Uppercase, One Lowercase, One Number and one special case Character"
            ),
    })

    const handleSubmit = async (value, {setErrors})=>{
        
            const {password} = value;
            const resetToken = match.params.resetToken;
            dispatch(resetPasswordThunk(password,resetToken)).then(res =>{

                alert("Password was reset successfully");
                history.push('/auth/login');

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
                            <Form>
                                <Field
                                    component={FormInput}
                                    label="+6 Character"
                                    type="password"
                                    forpassword="true"
                                    name="password"
                                    inputname="Password"
                                />
                                <ErrorMessage name="auth" className="error_message" component="div"/>
                <br/>
                <CustomButton type="submit">Reset Password</CustomButton>
            </Form>
            </Formik>

            <div className="auth_links"> 
            Go back to
            <Link to="/auth/login">  Log In</Link>
            </div>

        </div>
    )
}
export default ResetPassword;