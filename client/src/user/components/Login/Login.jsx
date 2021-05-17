import {  Field, Form, Formik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import CustomButton from '../../../common/custom-button/CustomButton';
import FormInput from '../../../common/form-input/FormInput';
import { getUserAuthStatus } from '../../../selectors/selectors';
import { loginThunk } from '../../redux/user-thunk';

const Login = (props) => {
    
    const dispatch = useDispatch();

    const isAuth = useSelector(getUserAuthStatus);

    const history = useHistory();
    if (isAuth) {
        history.push('/profile/dashboard');
    }



    const handleSubmit =  (value, {setErrors}) => {

        dispatch(loginThunk(value)).then(res =>{
            }).catch(err=>{

            const data = err?.response?.data;
            setErrors({auth:data.error});

        });
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Please enter valid email").required("This field is requird"),
        password: Yup
            .string()
            .required('Please Enter your password')
            .min(6, 'Min length: 6 Characters')
    })

    const initialValues = {
        email: '',
        password: '',
    }



    return (

        <div className="auth_component">
            <h2 className="auth_form_title">Log in</h2>

            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                {
                    formProps => {
                        return (
                            <Form>
                                <Field
                                    component={FormInput}
                                    type="text"
                                    name="email"
                                    inputname="Email"
                                    label="yadima@gmail.ro"
                                    
                                />

                                <Field
                                    component={FormInput}
                                    type="password"
                                    forpassword="true"
                                    name="password"
                                    inputname="Password"
                                    label="+6 Character"
                                    
                                />
                                 {formProps.errors.auth ? <div className="error_message">{formProps.errors.auth}</div> : '' }
                                <div className="auth_links forgot">
                                    <Link to="/auth/forgotpassword">Forgot password ?</Link>
                                </div>

                                <CustomButton type="submit">Login</CustomButton>

                            </Form>
                        )
                    }
                }
            </Formik>

            <div className="auth_links">
                Don't have an account?
            <Link to="/auth/register">  Register</Link>


            </div>

        </div>
    )
}
export default Login;