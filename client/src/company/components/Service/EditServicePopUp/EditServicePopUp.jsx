import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import CompanyServices from '../../../common/CompanyServices/CompanyServices';
import { BiEditAlt } from "react-icons/bi";
import CustomButton from '../../../../common/custom-button/CustomButton';

const EditServicePopUp = ({trigger,companyID, services,...props}) =>{
    const [popUpOpen, setPopUpOpen] = useState(false);

    return (
        <>
        <CustomButton onClick={()=>setPopUpOpen(true)} profilebtn whitebtn> <BiEditAlt /> Edit </CustomButton>
        <Popup open={popUpOpen} onClose={()=>setPopUpOpen(false)} closeOnDocumentClick modal nested >
        <div className="modal_popup custom_scrollbar" >
                        <div className="close" onClick={()=>setPopUpOpen(false)}>
                            &times;
                        </div>
                    <div className="modal_popup_container">

                        <h2 className="pop_up_title">Edit Service</h2>
                          
                <CompanyServices editMode companyID={companyID} services={services} setPopUpOpen={setPopUpOpen} />
        </div>
        </div>
        </Popup>
        </>
)
}

export default EditServicePopUp;