import React from 'react';
import { Route, useRouteMatch } from 'react-router';
import './AuthPage.css';
import PhoneImg from '../../assets/images/auth/HotelBookinpana.png'
import WelcomeImg from '../../assets/images/auth/welcome.png'
import Login from '../../user/components/Login/Login';
import Register from '../../user/components/Register/Register';
import ResetPassword from '../../user/components/ResetPassword/ResetPassword';
import ConfirmRegistration from '../../user/components/ConfirmRegistration/ConfirmRegistration';
import { withCheckIfIsLoginRedirect } from '../../hoc/withPublicRouteRedirect';
import ForgotPassword from '../../user/components/ForgotPassword/ForgotPassword';

const AuthPage = (props) => {
    const match = useRouteMatch();

    return (
        <div className="auth_page">
            <div className="auth_page_components">

                <Route exact path={`${match.url}/login`} render={() =>
                    <div className="auth_route">
                        <AuthImageWithTextComponent title="Hello, Welcome Back !" imgUrl={WelcomeImg} subtitle="Quis sagittis, velit est vitae." />
                        <Login />
                    </div>} />

                <Route exact path={`${match.url}/register`} render={() =>
                    <div className="auth_route">
                        <AuthImageWithTextComponent title="Let's Grow Your Business !" imgUrl={PhoneImg} subtitle="Viverra gravida parturient pharetra amet, lorem lacinia." />
                        <Register /> </div>} />

                <Route exact path={`${match.url}/forgotpassword`} render={() => <ForgotPassword />} />
                <Route exact path={`${match.url}/resetpassword/:resetToken`} render={() => <div> <ResetPassword /> </div>} />
                <Route exact path={`${match.url}/confirmRegister/:confirmRegisterToken`} render={() => <div> <ConfirmRegistration /> </div>} />
            </div>
        </div>
    )
}

const AuthImageWithTextComponent = (props) => {
    return (
        <div className="auth_img_component">
            <h1 className="auth_image_title">{props.title}</h1>
            <h3>{props.subtitle}</h3>
            <img className="auth_big_img" src={props.imgUrl} alt="ImageBackground" />
        </div>
    )
}


export default withCheckIfIsLoginRedirect(AuthPage);