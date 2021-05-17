import React from 'react';
import './ProfileMenu.css'
import DashboardImage from '../../../../assets/images/dashboard/Dashboard.png';
import ServiceImage from '../../../../assets/images/dashboard/Service.png';
import BookingImage from '../../../../assets/images/dashboard/Booking.png';
import {  useHistory, useLocation } from 'react-router';
import CompanyName from '../../../company-name/CompanyName';
const ProfileMenu = (props)=>{

    
    return(
<>
        <CompanyName/>
        <MenuItem  {...props} img={DashboardImage} title="Dashboard"/>
        <MenuItem  {...props} img={ServiceImage} title="Service" />
        <MenuItem  {...props} img={BookingImage} title="Booking" />

       </>
    )
}


const MenuItem = (props)=>{

    const location = useLocation();
    const thisPath = location.pathname.split('/')[2];
    const history = useHistory();
    return (
        <div onClick={()=>{history.push(`/profile/${props.title.toLowerCase()}`)}} className={`menuItem ${thisPath.toUpperCase() === props.title.toUpperCase() ? "active-menu-item" : ''}`}>
        <div className="menu-item-container">

            <div className="item_logo">
                <img src={props.img} alt="$ "/>
            </div>

            <div className="itemText">
                {props.title}
            </div>
        </div>
            
        </div>  
)
}
export default ProfileMenu