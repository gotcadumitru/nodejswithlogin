import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getMyCompanies } from '../../../selectors/selectors';
import CompanyWithServices from './CompanyWithServices/CompanyWithServices';


const Service = ({...props }) => {

    const myCompanies = useSelector(getMyCompanies);

    return (
        <Container fluid>

            <h2 className="section_title">Service</h2>
        <Row className="my_companies">
            {
                myCompanies.map(company => {
                    return (
                        <CompanyWithServices key={company._id} company={company} />
                    )
                })
            }
            {myCompanies.length===0 &&  "There are no services"}
        </Row>
        </Container>

    )
}


export default Service;