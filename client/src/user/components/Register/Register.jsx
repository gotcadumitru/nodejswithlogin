import React from 'react'
import { Link, useHistory} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import googleLogo from '../../../assets/images/auth/Logo-google-icon-PNG.png'
import { FaFacebookF } from "react-icons/fa";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import FormInput from '../../../common/form-input/FormInput';
import CustomButton from '../../../common/custom-button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { loginfacebookThunk, logingoogleThunk, registerNewUserThunk } from '../../redux/user-thunk';
import { getUserAuthStatus } from '../../../selectors/selectors';

const Register = (props) => {

    const dispatch = useDispatch();

    const history = useHistory();
    const isAuth = useSelector(getUserAuthStatus);
    if (isAuth) {

        history.push('/profile/dashboard');

    }


    const initialValues = {
        name: '',
        surname: '',
        email: '',
        password: '',
        checkBox: false,
    }

    const validationSchema = Yup.object().shape({
        email: Yup
            .string()
            .email("Please enter valid email")
            .required("This field is requird"),

        name: Yup
            .string("Please enter a valid name")
            .required("This field is required"),

        surname: Yup
            .string("Please enter a valid name")
            .required("This field is required"),

        password: Yup
            .string()
            .required('Please Enter your password')
            .min(6, 'Min length: 6 Characters')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain: One Uppercase, One Lowercase, One Number and one special case Character"
            ),

        checkBox: Yup
            .boolean()
            .oneOf([true], 'Must Accept Terms and Conditions'),
    })

    const handleSubmit =async (value, {resetForm,setErrors}) => {

        dispatch(registerNewUserThunk(value,setErrors)).then(resp =>{
            alert('A confirmation email was send to your account');

            resetForm();
        }).catch(err =>{

            const errorMess = err?.response?.data?.error
            setErrors({checkBox: errorMess,registerSucces: true,});
        })

    }


    const responseFacebook = (response) => {
        const { accessToken, userID } = response;
        if (accessToken)
        dispatch(loginfacebookThunk(accessToken, userID));
    }

    const responseGoogle = (response) => {
        const { tokenId } = response
        if (tokenId) {
            dispatch(logingoogleThunk(tokenId));
        }
    }

    return (

        <div className="auth_component">



            <h2 className="auth_form_title">Create Account</h2>
            <GoogleLogin
                render={(renderProps) => (
                    <button className="google_login" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <img className="google_logo" src={googleLogo} alt="googleLogo" />
                        <div>Sign up with Google</div>
                    </button>
                )}
                clientId="1057553385734-97f7heo0s1n4gvpvqa9q8qf6iati0rtd.apps.googleusercontent.com"
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}

            />
            <br />
            <FacebookLogin
                appId="912331699335421"
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="facebook_lgin"
                textButton="sign up with facebook"
                icon={<FaFacebookF />}
            />
            <div className="login_or_text">
                <span className="login_or_line">or</span>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                {
                    formProps => {
                        return (
                            <Form>

                                <Field
                                    component={FormInput}
                                    label="John"
                                    type="text"
                                    name="name" inputname="First name"
                                />
                                <Field
                                    component={FormInput}
                                    label="Doe"
                                    type="text"
                                    name="surname" inputname="Last name"
                                />
                                <Field
                                    component={FormInput}
                                    label="yadima@gmail.com"
                                    type="email"
                                    name="email" inputname="Email"
                                />
                                <Field
                                    component={FormInput}
                                    label="+6 Character"
                                    type="password"
                                    forpassword="true"
                                    name="password"
                                    inputname="Password"
                                />

                                <div className="auth_check_cont">
                                    <Field
                                        className="auth_checkbox"
                                        type="checkbox"
                                        name="checkBox" />
                                    <span>I agree with term and services</span>
                                        {<div className="check_error">{formProps.errors.error}</div>}
                                    <div className="check_error"><ErrorMessage name="checkBox" /></div>


                                </div>

                                <CustomButton type="submit">Create Account</CustomButton>
                            </Form>)
                    }
                }

            </Formik>
            <div className="auth_links">
                Have an account?
            <Link to="/auth/login">  Log In</Link>
            </div>

        </div>
    )
}
export default Register