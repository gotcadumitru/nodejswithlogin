import React  from 'react';
import DeleteCompanyPopUp from './DeleteCompanyPopUp/DeleteCompanyPopUp';
import EditCompanyPopUp from './EditMyCompany/EditMyCompany';
import ViewCompanyPopUp from './ViewCompanyPopUp/ViewCompanyPopUp';


const MyCompany = ({ company, ...props }) => {

    return (
        <div className="company_box">
            <div className="company_container">

                <div className="company_img_and_text">
                    <div className="company_img_container">

                        <div className="company_img_profile" style={{ backgroundImage: `url(${company.imageURL})` }}>

                        </div>
                    </div>
                    <div className="my_company_info">
                        <div className="my_company_name">
                            {company.name}
                        </div>
                        <div className="my_company_status">
                            Status: <span> Active</span>
                        </div>
                        <div className="my_company_desc custom_scrollbar">
                            {company.description}
                        </div>
                    </div>
                </div>
                <div className="my_company_white_btns">
                    <div className="my_company_white_btn">

                        <EditCompanyPopUp company={company} />
                    </div>
                    <div className="my_company_white_btn">

                        <DeleteCompanyPopUp companyID={company._id} />

                    </div>
                </div>
                <ViewCompanyPopUp company={company} />
            </div>
        </div>
    )
}
export default MyCompany
