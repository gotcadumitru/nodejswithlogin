import React from 'react';
import { Route } from 'react-router';
import Booking from './Booking/Booking';
import Dashboard from './Dashboard/Dasboard';
import Service from './Service/Service';

const ProfileRoutes = (props)=>{
    return(
         <div className="section">

        <Route exact path={`/profile/dashboard`} render={()=> <Dashboard/> }/>
        <Route exact path={`/profile/service`} render={()=> <Service/> }/>
        <Route exact path={`/profile/booking`} render={()=> <Booking/> }/>

         </div>

    )
}
export default ProfileRoutes