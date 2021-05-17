import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import CustomButton from '../../../../../../common/custom-button/CustomButton';
import CompanyProfile from '../../../../../common/CompanyProfile/CompanyProfile';
import { BiEditAlt } from "react-icons/bi";

const EditCompanyPopUp = ({ company, ...props }) => {

    const [popUpOpen, setPopUpOpen] = useState(false);
    return (
        <>
            <CustomButton onClick={() => setPopUpOpen(true)} profilebtn whitebtn> <BiEditAlt /> Edit </CustomButton>
            <Popup open={popUpOpen} Comp onClose={() => setPopUpOpen(false)} closeOnDocumentClick modal nested >
                <div className="modal_popup custom_scrollbar" >
                    <div className="close" onClick={() => setPopUpOpen(false)}>
                        &times;
                                </div>
                    <div className="modal_popup_container">

                        <h2 className="pop_up_title">Edit Company</h2>
                        <div>
                            <CompanyProfile setPopUpOpen={setPopUpOpen} editMode company={company} />
                        </div>
                    </div>
                </div>

            </Popup>
        </>
    )
}
export default EditCompanyPopUp;