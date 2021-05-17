import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CustomButton from '../../../common/custom-button/CustomButton';
import { getCompanies } from '../../../selectors/selectors';
import CompanyCard from '../CompanyCard/CompanyCard';
import { GrPowerReset } from "react-icons/gr";

const Companies = ({ makeReservationThunk, ...props }) => {

    const companies = useSelector(getCompanies);
    
    const [formData, handleFormData] = useState({
        searchText: '',
        date: '',
    });

    const [filterCompanies, setFilterCompanies] = useState([]);
    const [companyWithServicesCopy, setCompanyWithServicesCopy] = useState([]);

    const handleChangeFormData = (e)=>{
        const {value,name} = e.target;
        handleFormData({...formData,[name]:value});
    }
    useEffect(() => {

       setInitialCompanies();

    // eslint-disable-next-line
    }, [companies])
    
    const setInitialCompanies = () =>{
        let servicesArr = [];

        companies.forEach(company =>{
            company.services.forEach(service =>{
                servicesArr.push({
                    serviceID:service._id,
                    serviceName:service.name,
                    serviceDuration: service.duration,
                    servicePeriods:service.periods,
                    serviceSpace:service.space,
                    serviceWorkTime: service.workTime,
                    servicePrice: service.price,
                    serviceDescription:service.description,
                    companyName: company.name,
                    companyDescription:company.description,
                    companyImageURL:company.imageURL,
                    companyID: company._id,
                })
            })
        })

        setCompanyWithServicesCopy([...servicesArr]);
        setFilterCompanies([...servicesArr]);
    }
    const searchCompanies = (e) =>{

        e.preventDefault();
        const comp =  companyWithServicesCopy.filter(companyWithService => {

                if(formData.date!==''){

                    const numberDayOfWeekFromForm = new Date(formData.date).getDay()-1 === -1 ? 6 : new Date(formData.date).getDay()-1;
                    
                    const dayofWeekString = Object.keys(companyWithService.servicePeriods.byAdmin[numberDayOfWeekFromForm])[0]
                    const selectedbyAdmin = [...companyWithService.servicePeriods.byAdmin[numberDayOfWeekFromForm][dayofWeekString]]
                    if(selectedbyAdmin.length ===0){
                        return false;
                    }
                    const rentedPeriodsByGuestsForSelectedDay = companyWithService.servicePeriods.byGuests.filter(guest=>{
                        return new Date(guest.time).getFullYear() === new Date(formData.date).getFullYear() 
                        && new Date(guest.time).getMonth() === new Date(formData.date).getMonth()
                        && new Date(guest.time).getDate() === new Date(formData.date).getDate()  
                    })

                    if(rentedPeriodsByGuestsForSelectedDay.length >= selectedbyAdmin*companyWithService.serviceSpace){
                        return false
                    }
                }
            
                return companyWithService.serviceName.toLowerCase().indexOf(formData.searchText.toLowerCase()) > -1
                
            })
        setFilterCompanies(comp)
    }

    const resetSearchFilter = ()=>{
        handleFormData({
            searchText: '',
            date: '',
        });
        setFilterCompanies(companyWithServicesCopy);
    }

    return (
        <>
            {companies &&
                                            <Container>

                                    <Row>
                                    <Col xs={12} lg={7} className="reservation_form_container">
                                    <form onSubmit={searchCompanies} className="main_filter_form">
                                        <div className="search_input_group">

                                            <div className="search_input_name">Search Service:</div>
                                            <input
                                                onChange={handleChangeFormData}
                                                className="search_input"
                                                value={formData.searchText}
                                                type="text"
                                                label="search..."
                                                name="searchText"
                                                placeholder="search..."

                                                />
                                        </div>
                                        <div className="search_input_group">
                                            <div className="search_input_name">Date</div>
                                            <input
                                            onChange={handleChangeFormData}
                                            className="search_input"
                                            value={formData.date}
                                            type="date"
                                            name="date"
                                            inputname="date" 
                                            />
                                        </div>
                                        <div className="search_input_group">
                                            <CustomButton yellowbtn searchbtn>Search</CustomButton>
                                        </div>
                                        <div className="search_input_group reset_icon" onClick={resetSearchFilter}>
                                            <GrPowerReset/>
                                        </div>
                                    </form>
                                            </Col>
                                                </Row>


                                    <Row>
                                    {
                                        filterCompanies.length 
                                        ? filterCompanies.map(companyWithService => {
                                            return (
                                                    <Col key={companyWithService.serviceID} xs={12} lg={6} xl={4}>
                                                        <CompanyCard companyWithService={companyWithService} />
                                                    </Col> 
                                                )
       
                                        }
                                        )
                                        :
                                        <div className="main_companies_no_company">
                                            There are no companies for your preferences
                                        </div>
                                    }
                                    </Row>
                                

                                </Container>

                    
            }
        </>
    )
}

export default Companies;