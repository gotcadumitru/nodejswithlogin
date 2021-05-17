import React, { useState } from 'react';
import { getServiceAvailibilityString } from '../../../selectors/selectors';
import { IoCalendarOutline, IoBagRemoveOutline } from "react-icons/io5";
import { BiTimeFive, BiDollarCircle } from "react-icons/bi";
import CustomButton from '../../../common/custom-button/CustomButton';
import MainPageReservation from '../ReservationPopUps/MainPageReservation';
import ReservationGuestInfoPopUp from '../ReservationPopUps/ReservationGuestInfoPopUp';
import ConfirmReservation from '../ReservationPopUps/ConfirmReservation'
import Popup from 'reactjs-popup';
import { useDispatch } from 'react-redux';
import { makeReservationThunk } from '../../redux/guest-thunk';
const CompanyCard = ({ companyWithService }) => {
    
    const dispatch = useDispatch();

    const [reservationMessage, setReservationMessage] = useState('');
    const [userBookInfo,setUserBookInfo] = useState(null);
    
    const [popUpOpen, setPopUpOpen] = useState(false);

    const [isPopUpTableOpen,setIsPopUpTableOpen] = useState(true);

    const handleSubmitTableReservation = (val, formProps) => {
        
        if(val.time===-1){
            formProps.setErrors({time: "Please select an valid interval"})
        }else{

            setUserBookInfo({
                ...val,
                time: new Date(val.time).getTime(),
            })
            setIsPopUpTableOpen(false);
        }
    }
    const onClosePopUp = ()=>{
        setPopUpOpen(false)
        setIsPopUpTableOpen(true);
        
    }
    const handleSubmitUserInfo = (val, formProps) => {

        dispatch(makeReservationThunk({
            ...userBookInfo,
            ...val,
            companyID: companyWithService.companyID,
            serviceID: companyWithService.serviceID,
        })).then(response =>{
            setReservationMessage(response.message)
        }).catch(err =>{
            setReservationMessage(err?.response?.data?.message);
        })
    }
    return (
        <div className="main_view_companies">

            <div className="main_view_companies_image"
                style={{ backgroundImage: `url(${companyWithService.companyImageURL})` }}
            />
            <div className="view_company_content">
                <div className="view_company_services">

                    <div className="view_company_title">
                        {companyWithService.companyName}
                    </div>
                    <div className="view_company_desc custom_scrollbar">
                        {companyWithService.companyDescription}
                    </div>
                    <div className="view_company_one_service">
                        <div className="view_company_info">
                            <IoBagRemoveOutline className="view_company_icon" />
                            {companyWithService.serviceName}
                        </div>
                        <div className="view_company_info">
                            <BiTimeFive className="view_company_icon" />    {`${companyWithService.serviceWorkTime[0]} - ${companyWithService.serviceWorkTime[1]}`}
                        </div>
                        <div className="view_company_info">
                            <BiDollarCircle className="view_company_icon" />    {companyWithService.servicePrice}
                        </div>
                        <div className="view_company_info">
                            <IoCalendarOutline className="view_company_icon" />    {getServiceAvailibilityString({periods:companyWithService.servicePeriods})}
                        </div>
                    </div>
                </div>

                            <CustomButton onClick={()=>{setPopUpOpen(true)}} profilebtn>Book Service</CustomButton>
                <Popup open={popUpOpen} onClose={()=>onClosePopUp()} closeOnDocumentClick modal nested >
                            
                    <div className="modal_popup custom_scrollbar" >
                        <div className="close" onClick={()=>setPopUpOpen(false)}>
                            &times;
                        </div>
                    <div className="modal_popup_container">

                        <h2 className="pop_up_title">{companyWithService.serviceName}</h2>
                           
                            {
                                reservationMessage ? 
                                <ConfirmReservation setPopUpOpen={setPopUpOpen} reservationMessage={reservationMessage} />

                                : isPopUpTableOpen ? <MainPageReservation
                                setPopUpOpen={setPopUpOpen}
                                handleSubmitTableReservation={handleSubmitTableReservation}
                                companyWithService={companyWithService}
                                
                            />
                            : <ReservationGuestInfoPopUp
                                handleSubmitUserInfo={handleSubmitUserInfo}
                                companyWithService={companyWithService}
                                 />
                            }

                    </div>
                    </div>
                </Popup>


            </div>

        </div>
    )
}
export default CompanyCard;