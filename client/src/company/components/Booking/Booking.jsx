import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getMyCompanies } from '../../../selectors/selectors';
import ServiceBooking from './ServiceBooking/ServiceBooking';
import { BiFilterAlt } from "react-icons/bi";
import { Container } from 'react-bootstrap';
import ServiceBookingFilter from './ServiceBooking/ServiceBookingFilter/ServiceBookingFilter';
import Popup from 'reactjs-popup';

const Booking = (props) => {

    const myCompanies = useSelector(getMyCompanies);
    const [bookingFilterData, setBookingFilterData] = useState({
        service: '',
        time: '',
    })
    const [popUpOpen, setPopUpOpen] = useState(false);

    const selectServiceOptions = myCompanies
        .map(company => company.services
            .filter(service => service.periods.byGuests.length > 0)
            .map(service => service.name))
        .filter(serviceNameArr => serviceNameArr.length > 0)
        .join()
        .split(",");

    const selectTimeOptions = myCompanies
        .map(company => company.services
            .filter(service => service.periods.byGuests.length > 0)
            .map(service => service.periods.byGuests.map(({ time }) => new Date(time).toISOString().split("T")[0])
                .join())
            .join())
        .filter(serviceNameArr => serviceNameArr.length > 0)
        .join()
        .split(",")
        .sort()
        .reduce((a, b) => { if (a.indexOf(b) < 0) a.push(b); return a; }, []);


    const myFiltredCompanies = myCompanies.map(company => {

        const filtred = company.services.map(service => {

            if ((bookingFilterData.service !== '') && (bookingFilterData.service.toUpperCase() !== service.name.toUpperCase()))
                return false

            const filtredTimes = service.periods.byGuests.map((period) => {
                return (bookingFilterData.time !== '') && (bookingFilterData.time !== new Date(period.time).toISOString().split("T")[0]) ? false : period
            }).filter(time => time !== false)

            return filtredTimes.length === 0 ? false : { ...service, periods: { byGuests: filtredTimes } }

        }).filter(service => service !== false);

        return filtred.length > 0 ? { ...company, services: [...filtred] } : false

    }).filter(company => company !== false)

    return (
        <Container fluid>

            <h2 className="section_title">Booking</h2>

            <div className="filter_icon_profile_container">

                {myFiltredCompanies.length > 0
                    && <>
                        <span onClick={() => { setPopUpOpen(true) }} className="filter_icon_profile">Filter <BiFilterAlt /></span>

                        <Popup open={popUpOpen} onClose={()=>setPopUpOpen(false)} closeOnDocumentClick modal nested >
                            <div className="modal_popup custom_scrollbar" >
                                <div className="close" onClick={() => setPopUpOpen(false)}>
                                    &times;
                                </div>
                                <div className="modal_popup_container">

                                    <h2 className="pop_up_title">Filter</h2>
                                    <h2 className="pop_up_sub_title">filter booking</h2>

                                    <ServiceBookingFilter selectTimeOptions={selectTimeOptions} selectServiceOptions={selectServiceOptions} bookingFilterData={bookingFilterData} setBookingFilterData={setBookingFilterData} setPopUpOpen={setPopUpOpen} />
                                </div>
                            </div>
                        </Popup>
                    </>
                }
            </div>
            <div className="my_companies">
                <div className="booking_container">

                    {
                        myFiltredCompanies.length > 0
                            ? myFiltredCompanies.map(company => {
                                return (
                                    <div key={company._id}>
                                        <>
                                            <div className="company_booking">
                                                <div>
                                                    <div className="company_booking_name">{company.name}</div>
                                                    <div className="company_booking_subtext">BOOKING APPOINTMENT</div>
                                                </div>
                                                <Container fluid className="booking_table">

                                                    <div className="booking_row_table title">

                                                        <div className="booking_col_table">Customer name</div>
                                                        <div className="booking_col_table">Service</div>
                                                        <div className="booking_col_table">Booking time</div>
                                                        <div className="booking_col_table">Duration</div>
                                                        <div className="booking_col_table">Total price</div>
                                                        <div className="booking_col_table">Cappacity</div>

                                                    </div>

                                                    {
                                                        company.services.map(service => {

                                                            return service.periods.byGuests
                                                                .sort((per1, per2) => per2.time - per1.time)
                                                                .map(period => {
                                                                    return (
                                                                            <ServiceBooking key={period+Math.random()} service={service} period={period} />
                                                                    )
                                                                })
                                                        })


                                                    }
                                                </Container>
                                            </div>
                                        </>


                                    </div>
                                )

                            }) : <div>There are no reservations</div>
                    }
                </div>
            </div>

        </Container>
    )
}


export default Booking;