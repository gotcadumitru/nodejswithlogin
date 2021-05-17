import React from 'react';
import './CompanyWithServices.css'
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import Ximage from '../../../../assets/images/auth/Cancel-bro 1.png'
import AddServiceToExistentCompanyPopUp from '../AddServiceToExistentCompanyPopUp/AddServiceToExistentCompanyPopUp';
import EditServicePopUp from '../EditServicePopUp/EditServicePopUp';
import CustomButton from '../../../../common/custom-button/CustomButton';
import DeleteServicePopUp from '../DeleteServicePopUp/DeleteServicePopUp';
import { getServiceAvailibilityString } from '../../../../selectors/selectors';
import { Col } from 'react-bootstrap';

const CompanyWithServices = ({ company, ...props }) => {
    const { services } = company;


    return (
        <Col className="mb-4" md={12} lg={10} xl={6}>
            <div className="company_box">
                <div className="services_and_company_container custom_scrollbar">

                    <h3 className="services_company_name">{company.name}</h3>

                    {
                        services.length > 0
                            ? services.map((service, index) => {
                                return (
                                    <div key={service._id} className="service_info">

                                        <ServicePropritey title="Service Name" info={service.name} />
                                        <ServicePropritey title="Description" info={`${service.description.slice(0, 40)}${service.description.length >= 40 ? '...' : ''}`} />
                                        <ServicePropritey title="Availibility" info={getServiceAvailibilityString(service)} />
                                        <ServicePropritey title="Cappacity" info={service.space} />
                                        <ServicePropritey title="Duration" info={`${service.duration} minutes`} />
                                        <ServicePropritey title="Price" info={`${service.price} RON`} />
                                        {
                                            index < services.length - 1 && <hr className="custom_hr_line" />

                                        }
                                    </div>

                                )
                            })
                            : <div className="container_image_services" >
                                <img src={Ximage} alt="Nothing" />
                            </div>
                    }

                </div>
                <div className="my_company_white_btns">
                    <div className="my_company_white_btn">
                        {
                            company.services.length > 0
                                ?
                                <EditServicePopUp
                                    companyID={company._id}
                                    editMode
                                    services={company.services}
                                />
                                : <CustomButton style={{ cursor: "not-allowed",outline: "none" }} profilebtn whitebtn> <BiEditAlt /> Edit </CustomButton>
                        }

                    </div>
                    <div className="my_company_white_btn">
                        {
                            company.services.length > 0
                                ?
                                <DeleteServicePopUp
                                    company={company}
                                />
                                : <CustomButton style={{ cursor: "not-allowed",outline: "none" }} profilebtn whitebtn> <AiOutlineDelete /> Delete </CustomButton>
                        }


                    </div>
                </div>
                <AddServiceToExistentCompanyPopUp companyID={company._id} />
            </div>

        </Col>
    );
}



const ServicePropritey = ({ title, info }) => {
    return (
        <div className="service_ropriety">
            <div className="service_propriety_title">
                {title}
            </div>
            <div className="service_propriety_info">
                {info}
            </div>
        </div>
    )
}
export default CompanyWithServices;

