import React from 'react';
import BlogoImage from '../../assets/images/dashboard/Blogo.png';

const CompanyName = (props)=>{
    return (
        <div className="companyName">
           <img className="blogo" src={BlogoImage} alt="B"/>
           Booking.app
        </div>
    )
}
export default CompanyName