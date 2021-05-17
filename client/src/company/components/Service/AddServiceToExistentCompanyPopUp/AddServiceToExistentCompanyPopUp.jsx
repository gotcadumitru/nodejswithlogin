import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import CustomButton from '../../../../common/custom-button/CustomButton';
import CompanyServices from '../../../common/CompanyServices/CompanyServices';

const AddServiceToExistentCompanyPopUp = ({companyID,...props}) =>{

    const [popUpOpen, setPopUpOpen] = useState(false);

    return (
        <>
        <div onClick={() => setPopUpOpen(true)} className="my_company_view_btn"><CustomButton profilebtn>Add Service</CustomButton></div>
          <Popup open={popUpOpen} onClose={()=>setPopUpOpen(false)} closeOnDocumentClick modal nested >
                            <div className="modal_popup custom_scrollbar" >
                                <div className="close" onClick={() => setPopUpOpen(false)}>
                                    &times;
                                </div>
                                <div className="modal_popup_container">

                                    <h2 className="pop_up_title">Add Services</h2>

                <CompanyServices companyID={companyID} setPopUpOpen={setPopUpOpen} />
                </div>
            </div>
        </Popup>
        </>
    )
}

export default AddServiceToExistentCompanyPopUp;