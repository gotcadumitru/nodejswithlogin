import React from 'react';
import confirmReservImg from '../../../assets/images/auth/confirmed.png'
import CustomButton from '../../../common/custom-button/CustomButton';
const ConfirmReservation = ({reservationMessage,setPopUpOpen,...props})=>{
    return (
        <div className="reservation_confirm_container">
            <div className="reservation_confirm_image">
                <img src={confirmReservImg} alt="Confirmed"/>
            </div>
            <div className="reservation_confirm_text">
                <div className="reservation_confirm_title">
                    Congratulation
                </div>
                <div className="reservation_confirm_body">
                {
                    reservationMessage
                }
                </div>
            </div>
            <CustomButton profilebtn onClick={()=>setPopUpOpen(false)}>Check Email</CustomButton>

        </div>
    )
}
export default ConfirmReservation