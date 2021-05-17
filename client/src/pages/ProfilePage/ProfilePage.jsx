import React, { useEffect, useState } from 'react';
import ProfileRoutes from '../../company/components/ProfileRoutes';
import { WithPrivateRouteRedirect } from '../../hoc/withPrivateRouteRedirect';
import Header from '../../common/components/layout/Header/Header';
import ProfileMenu from '../../common/components/layout/ProfileMenu/ProfileMenu';
import { AiOutlineMenu } from "react-icons/ai";
import './ProfilePage.css'
import { Redirect, useLocation } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';

const ProfilePage = (props) => {

    const location = useLocation()

    const { innerWidth: width} = window;
    const [isNavbarShow, handleNawbarStatus] = useState(width > 1000);

    const toggleContainer = React.createRef();

    useEffect(() => {

        const onClickOutsideHandler = (event) => {
            if (isNavbarShow && !toggleContainer?.current?.contains(event.target)) {
                handleNawbarStatus(false);
            }
        }

        document.addEventListener('click', onClickOutsideHandler);
        return () => {
            document.removeEventListener('click', onClickOutsideHandler);
        }

    // eslint-disable-next-line
    }, [toggleContainer]);

    if (location.pathname === '/profile/' || location.pathname === '/profile') {
        return <Redirect to='/profile/dashboard' />
    }
    return (

        <Container fluid>
            <Row className="d-flex">

                {isNavbarShow || width > 1000
                    ?  <Col xs={9} sm={5} md={3} lg={2} className={`p-0 bg-white min-vh-100 ${width > 1000 ? "" : "profile_menu_responsive"}`} ><div ref={toggleContainer}> <ProfileMenu /></div></Col>
                    : <div> <AiOutlineMenu onClick={() => { handleNawbarStatus(true) }} className="navbar_icon_show" /></div>
                }
                <Col xs={width > 1000 ? 10 : 12} className="p-0">
                    <Header />
                    <ProfileRoutes />
                </Col>  

            </Row>
        </Container>
    )
}

export default WithPrivateRouteRedirect(ProfilePage)
