import React from 'react';
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
const ServiceBooking = ({period,service,...props}) =>{
     
    return (
        <>
        <div className="booking_row_table">
            <div className="booking_col_table">
                <div>
                {`${period.firstName} ${period.lastName}`}
                </div>
                <div className="booking_table_subinfo">
                    {period.email}
                </div>
                <div className="booking_table_subinfo">
                    {period.phone}
                </div>
            </div>
            <div className="booking_col_table" >{service.name}</div>
            <div className="booking_col_table">

                <div >
                    {new Date(period.time).toISOString().split("T")[0]}
                </div>

                <div className="booking_table_subinfo">
                    {`${new Date(period.time).toTimeString().split(' ')[0].split(':').slice(0, 2).join(':')} - ${new Date(period.time + (service.duration * 60000)).toTimeString().split(' ')[0].split(':').slice(0, 2).join(':')}`}
                </div>
            </div>
            <div className="booking_col_table">
            {service.duration} minutes

            </div>
            <div className="booking_col_table">
                {service.price*period.guestNumber*service.price} RON
            </div>
            <div className="booking_col_table">
                {period.guestNumber} Person{period.guestNumber>1?"s":''} {period.time<new Date().getTime() ? <AiFillHeart/> : <AiOutlineHeart/>}
            </div>

        </div>
            <hr className="custom_hr_line" />
            </>
    )
}
export default ServiceBooking