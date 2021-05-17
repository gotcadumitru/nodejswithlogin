import React, { useRef } from 'react'
import CompanyName from '../../common/company-name/CompanyName';
import './MainPage.css'
import helloIMG from '../../assets/images/mainpage/helloBro.png'
import CustomButton from '../../common/custom-button/CustomButton';
import locationImg from '../../assets/images/mainpage/icons/Location.png';
import workImg from '../../assets/images/mainpage/icons/Work.png';
import calendarImg from '../../assets/images/mainpage/icons/Calendar.png';
import checkImg from '../../assets/images/mainpage/icons/Check.png';
import Companies from '../../guest/common/Companies/Companies';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

const MainPage = (props) =>{

    const history = useHistory()

    const mainMageRef = useRef(null)

    const scrollToBottom = () => {
      mainMageRef.current?.scrollIntoView({ behavior: "smooth" })
    }


    return (
        <div className="main_page">
            <div className="ellipse"/>
            <Container>

            <CompanyName/>

                <Row  className="main_top_info justify-content-center">
                    <Col className="text-center" xs={10} md={6}>
                        <h1 className="main_page_title">
                            Book Service As Easy As One Click
                        </h1>
                        <h2 className="main_page_sub_title">
                            Welcome to Booking.app the web based app that make your live much easier 
                        </h2>
                        <Row className="main_book_btn d-xs-block d-lg-flex align-items-center mx-auto ">
                            <Col xs={12} lg={6} className="mb-2">
                                <CustomButton onClick={scrollToBottom} yellowbtn > Book Now</CustomButton>
                            </Col>
                            <Col xs={12} lg={6} className="mb-2">
                                <CustomButton onClick={()=>history.push("/auth/register")} yellowbtn > Register</CustomButton>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={10}  md={6}>
                        <img className="mx-auto" src={helloIMG} alt="Hello"/>
                    </Col>
                </Row>
                
                <section className="main_section">

                <div className="main_section_text">
                    <div className="main_section_text_title">
                        Simple and easy steps to booking
                    </div>
                    <div className="main_section_text_subtitle">
                        A few  simple steps to booking a service, see how easy to booking 
                    </div>
                </div>

          
                    <Container fluid className="main_info_steps">
                    <Row className="d-flex justify-content-between">
                        
                        <MainStepWithIcon icon={locationImg} title="Choose Company">
                            Amet quisque eleifend justo, duis
                        </MainStepWithIcon>
                        <MainStepWithIcon icon={workImg} title="Select service">
                            Lectus nisi suspendisse sit euismod
                        </MainStepWithIcon>
                        <MainStepWithIcon icon={calendarImg} title="Select the date">
                            Consequat lacinia molestie nisl sit
                        </MainStepWithIcon>
                        <MainStepWithIcon icon={checkImg} title="Book Service">
                            Dignissim sit malesuada ut lectus
                        </MainStepWithIcon>
                    </Row>
                    <hr className="custom_hr_line main d-none d-md-block"/>
                    </Container>
                </section>


                <section className="main_section">

                <div className="main_section_text mb-4">
                    <div className="main_section_text_title">
                    Company List
                    </div>
                    <div className="main_section_text_subtitle">
                    Let’s book a service from our company list 
                    </div>
                </div>
                <div ref={mainMageRef} />
                    <Companies/>

                </section>




                </Container>
        </div>
    )
}

const MainStepWithIcon = ({icon,title,children})=>{
    return (
        <Col xs={6} md={3}  className="text-center main_spep_item">
            <div className="main_step_img">
                <img src={icon} alt="Icon"/>
            </div>
            <div className="main_step_title">{title}</div>
            <div className="main_step_text text-center">{children}</div>
        </Col>
    )
}
export default MainPage;