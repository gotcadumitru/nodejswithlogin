import React, { useState } from "react";

import { useSelector } from "react-redux";
import { getSelectedCompanyID } from "../../../../../../selectors/selectors";
import CompanyProfile from "../../../../../common/CompanyProfile/CompanyProfile";
import CompanyServices from "../../../../../common/CompanyServices/CompanyServices";
import { } from "../../../../../redux/company-thunk";
import CompanyPayment from "./CompanyPayment/CompanyPayment";



const AddCompanyPopUp = (props) => {
    
    const companyID = useSelector(getSelectedCompanyID);

    const [activeSection, setActiveSection] = useState("Profile")

    return (

            <>

                <div className="add_company_menu">
                    <div onClick={() => setActiveSection("Profile")} className={activeSection.toUpperCase() === "PROFILE" ? "add_company_menu_active" : ''}>
                        Profile
                    </div>
                    <div onClick={() => setActiveSection("Services")} className={activeSection.toUpperCase() === "SERVICES" ? "add_company_menu_active" : ''}>
                        Services
                    </div>
                    <div onClick={() => setActiveSection("Services")} className={activeSection.toUpperCase() === "PAYMENT" ? "add_company_menu_active" : ''}>
                        Payment
                    </div>
                </div>
                <span className="add_line"></span>

                {activeSection.toUpperCase() === "PROFILE" && <CompanyProfile setActiveSection={setActiveSection}/>}
                {activeSection.toUpperCase() === "SERVICES" && <CompanyServices companyID={companyID} setPopUpOpen={props.setPopUpOpen} />}
                {activeSection.toUpperCase() === "PAYMENT" && <CompanyPayment />}
            </>


    )
}



export default AddCompanyPopUp;
