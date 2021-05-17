import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import forgotImage from '../../../assets/images/auth/forgotimage.png';
import { confirmRegistrationThunk } from '../../redux/user-thunk';



const ConfirmRegistration = (props) => {

    const history = useHistory();
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const confirmRegisterToken = match.params.confirmRegisterToken;

    const [confirmregisterMessage,setConfirmregisterMessage] = useState({
        isSucces: null,
        message:'Wait.....',
    });

    useEffect(()=>{
        confirmReg()
        
        // eslint-disable-next-line
    },[]);
    
    const confirmReg = ()=>{
        dispatch(confirmRegistrationThunk(confirmRegisterToken)).then(response =>{

            setTimeout(()=>{
                history.push("/profile/dashboard")
            },11000)
            setConfirmregisterMessage({isSucces: true, message: 'The account has been successfully confirmed.In 10 seconds you will be redirected to profile page'});
        }).catch(err =>{

            setTimeout(()=>{
                history.push("/auth/login");
            },11000)
            setConfirmregisterMessage({isSucces: false, message: err?.response?.data.error+". In 10 seconds you will be redirected to login page"})
        })

    }
    return (
        
        <div className="auth_component">
        
        <div className="forgot_pass_img">
        <img src={forgotImage} alt="Forgot Password"/>
        </div>

        <div className="confirm_register">

        <div>
            {
                confirmregisterMessage.isSucces 
                ? <div className="confirm_succes" >{confirmregisterMessage.message}</div> 
                : <div className="confirm_error" >{confirmregisterMessage.message}</div> 
            }
        </div>

        </div>
        



        </div>
    )
}
export default ConfirmRegistration