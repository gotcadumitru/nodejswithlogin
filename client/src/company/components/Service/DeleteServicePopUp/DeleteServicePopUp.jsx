import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './deleteService.css';
import { deleteServiceThunk } from '../../../redux/company-thunk'
import { AiOutlineDelete } from "react-icons/ai";
import Popup from 'reactjs-popup';
import deleteCompanyImg from '../../../../assets/images/dashboard/deleteCompany.png'
import CustomButton from '../../../../common/custom-button/CustomButton';
const DeleteServicePopUp = ({ company, services, ...props }) => {

    const dispatch = useDispatch();

    const [popUpOpen, setPopUpOpen] = useState(false);
    const [deletePopUpOpen, setDeletePopUpOpen] = useState(false);
    const deleteService = (data) => {
        dispatch(deleteServiceThunk(data));
        setPopUpOpen(false);
    }

    return (
        <>
            <CustomButton onClick={() => { setPopUpOpen(true) }} profilebtn whitebtn> <AiOutlineDelete /> Delete </CustomButton>
            <Popup open={popUpOpen} onClose={() => setPopUpOpen(false)} closeOnDocumentClick modal nested >
                <div className="modal_popup custom_scrollbar" >
                    <div className="close" onClick={() => setPopUpOpen(false)}>
                        &times;
                        </div>
                    <div className="modal_popup_container">

                        <h2 className="pop_up_title">Delete Service</h2>

                        <div className="delete_service_popup_container">

                            <div className="delete_service">
                                <div className="delete_service_item">
                                    <div className="delete_ervice_info title">
                                        Name
                            </div>

                                    <div className="delete_ervice_info title">
                                        Price
                            </div>

                                    <div className="delete_ervice_info title">
                                        Space
                            </div>

                                    <div className="delete_ervice_info title">
                                        Duration
                            </div>
                                    <div className="delete_ervice_info title">
                                    </div>

                                </div>
                                {company.services.map((service) => {
                                    return (

                                        <div key={service._id} className="delete_service_item">

                                            <div className="delete_ervice_info">
                                                {service.name}
                                            </div>

                                            <div className="delete_ervice_info">
                                                {service.price}
                                            </div>

                                            <div className="delete_ervice_info">
                                                {service.space}
                                            </div>

                                            <div className="delete_ervice_info">
                                                {service.duration}
                                            </div>

                                            <div className="delete_ervice_info">
                                                <span onClick={() => { setDeletePopUpOpen(true) }} className="delete_btn">Delete</span>
                                                <Popup open={deletePopUpOpen} onClose={() => setDeletePopUpOpen(false)} closeOnDocumentClick modal nested >

                                                    <div className="modal_popup custom_scrollbar" >
                                                        <div className="close" onClick={() => setDeletePopUpOpen(false)}>
                                                            &times;
                                                            </div>
                                                        <div className="modal_popup_container">

                                                            <h2 className="pop_up_title">Alert</h2>


                                                            <div>

                                                                <div className="delete_company_container">
                                                                    <div className="delete_img_container">
                                                                        <img src={deleteCompanyImg} alt="Are you shure?" />
                                                                    </div>
                                                                    <div className="delete_img_text">

                                                                        <div className="delete_company_header">
                                                                            Delete Service
                                                    </div>

                                                                        <div className="delete_company_body">
                                                                            Are you sure want to delete service ? It can’t be restored after take  delete action
                                                    </div>

                                                                    </div>
                                                                    <CustomButton onClick={() => { setDeletePopUpOpen(false); deleteService({ serviceID: service._id, companyID: company._id }) }}> Yes, Delete </CustomButton>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Popup>

                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}

export default DeleteServicePopUp;