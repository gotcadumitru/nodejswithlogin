import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import CustomButton from '../../../../../../common/custom-button/CustomButton';
import { getServiceAvailibilityString } from '../../../../../../selectors/selectors';
import { IoCalendarOutline, IoBagRemoveOutline } from "react-icons/io5";
import { BiTimeFive, BiDollarCircle } from "react-icons/bi";

const ViewCompanyPopUp = ({ company, ...props }) => {
    const [popUpOpen, setPopUpOpen] = useState(false);

    return (
        <>
            <div className="my_company_view_btn"><CustomButton onClick={() => setPopUpOpen(true)} profilebtn>View Company</CustomButton></div>
            <Popup open={popUpOpen} onClose={() => setPopUpOpen(false)} closeOnDocumentClick modal nested >
                <div className="modal_popup custom_scrollbar" >
                    <div className="close" onClick={() => setPopUpOpen(false)}>
                        &times;
                                </div>
                    <div className="modal_popup_container">

                        <h2 className="pop_up_title">Info</h2>

                        <div >
                            <div>

                                <div className="view_company_image"
                                    style={{ backgroundImage: `url(${company.imageURL})` }}
                                />
                                <div className="view_company_content">
                                    <div className="view_company_services">

                                        <div className="view_company_title">
                                            {company.name}
                                        </div>
                                        <div className="view_company_desc ">
                                            {company.description}
                                        </div>

                                        {
                                            company.services.length === 0 ?
                                                "No Services"
                                                : company.services.map(service => {
                                                    return (
                                                        <div key={service._id} className="view_company_one_service">
                                                            <div className="view_company_info">
                                                                <IoBagRemoveOutline className="view_company_icon" />
                                                                {service.name}
                                                            </div>
                                                            <div className="view_company_info">
                                                                <BiTimeFive className="view_company_icon" />    {`${service.workTime[0]} - ${service.workTime[1]}`}
                                                            </div>
                                                            <div className="view_company_info">
                                                                <BiDollarCircle className="view_company_icon" />    {service.price}
                                                            </div>
                                                            <div className="view_company_info">
                                                                <IoCalendarOutline className="view_company_icon" />    {getServiceAvailibilityString(service)}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                        }
                                    </div>

                                    <CustomButton onClick={() => setPopUpOpen(false)} profilebtn>Book Service</CustomButton>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}
export default ViewCompanyPopUp;