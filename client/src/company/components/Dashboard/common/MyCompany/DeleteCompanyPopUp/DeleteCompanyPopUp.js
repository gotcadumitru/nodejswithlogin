import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { AiOutlineDelete } from "react-icons/ai";
import deleteCompanyImg from '../../../../../../assets/images/dashboard/deleteCompany.png'
import CustomButton from '../../../../../../common/custom-button/CustomButton';
import { deleteCompanyThunk } from '../../../../../redux/company-thunk';
import { useDispatch } from 'react-redux';

const DeleteCompanyPopUp = ({  companyID, ...props }) => {
    const [popUpOpen, setPopUpOpen] = useState(false);

    const dispatch = useDispatch();

    return (
        <>
            <CustomButton onClick={() => { setPopUpOpen(true) }} profilebtn whitebtn> <AiOutlineDelete /> Delete </CustomButton>
            <Popup open={popUpOpen} onClose={() => setPopUpOpen(false)} closeOnDocumentClick modal nested >

                <div className="modal_popup custom_scrollbar" >
                    <div className="close" onClick={() => setPopUpOpen(false)}>
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
                                        Delete Company
                        </div>

                                    <div className="delete_company_body">
                                        Are you sure want to delete company ? It can’t be restored after take  delete action
                        </div>

                                </div>
                                <CustomButton onClick={() => { setPopUpOpen(false); dispatch(deleteCompanyThunk (companyID)) }}> Yes, Delete </CustomButton>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}
export default DeleteCompanyPopUp;