import React, { useState } from 'react';
import './Dashboard.css'
import { useSelector } from 'react-redux';
import { GoPlus } from "react-icons/go";
import { getMyCompanies } from '../../../selectors/selectors';
import MyCompany from './common/MyCompany/MyCompany';
import AddCompanyPopUp from './common/AddCompany/AddCompanyPopUp/AddCompanyPopUp';
import { Col, Container, Row } from 'react-bootstrap';
import Popup from 'reactjs-popup';



const Dashboard = (props) => {
    
    const myCompanies = useSelector(getMyCompanies);

    const [popUpOpen, setPopUpOpen] = useState(false);

    return (
        <>
            <Container fluid >
            <Row >
                <Col>
            <h2 className="section_title">Overview</h2>
                </Col>
            </Row>

            <Row >
                <Col md={12} lg={10} className="mb-4" xl={5}>
                    <div className="company_box">
                        <div className="add_company_container">
                            <div>

                                <h3 className="add_company_title"> Add Company</h3>
                                <div className="add_company_desc">Click button to add new company</div>
                            </div>

                            <div onClick={()=>setPopUpOpen(true)} className="add_company_img_profile"> <GoPlus className="add_company_icon"/> </div>
                            <Popup  open={popUpOpen} onClose={()=>setPopUpOpen(false)} closeOnDocumentClick modal nested>

                            <div className="modal_popup custom_scrollbar" >
                                <div className="close" onClick={() => setPopUpOpen(false)}>
                                    &times;
                                </div>
                                <div className="modal_popup_container">

                                    <h2 className="pop_up_title">Alert</h2>

                                <AddCompanyPopUp setPopUpOpen={setPopUpOpen} />
                                </div>
                            </div>
                            </Popup>

                        </div>
                    </div>
                </Col>
            </Row>
            
                <Row>
                {myCompanies.map(company => {
                    return <Col key={company.name} className="mb-4"  md={12} lg={10} xl={6} ><MyCompany company={company} /></Col>
                })}
                </Row>
            </Container>
            </>
    )
}


export default Dashboard;