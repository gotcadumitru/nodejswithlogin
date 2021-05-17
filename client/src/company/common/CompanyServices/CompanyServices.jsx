import React, { useEffect,  useState } from 'react';
import './CompanyServices.css'
import { Field, Form, Formik, } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import ServiceAviabilityTable from '../ServiceAviabilityTable/ServiceAviabilityTable';
import { addServiceThunk, editServicesThunk } from '../../redux/company-thunk';
import FormInput from '../../../common/form-input/FormInput';
import CustomButton from '../../../common/custom-button/CustomButton';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';


const CompanyServices = ({ services, editMode, companyID, ...props }) => {

    const dispatch = useDispatch();

    const [numberOfSetInitialValuesToSkip, setNumberOfInitialValuesToSkip] = useState(0);

    const [serviceAviability, setServiceAviability] = useState([[
        { mon: [] },
        { tue: [] },
        { wed: [] },
        { thu: [] },
        { fri: [] },
        { sat: [] },
        { sun: [] },
    ]]);

    useEffect(() => {
        if (editMode) {

            const list = services.map((service, index) => {
                return service.periods.byAdmin
            })
            setServiceAviability([...list]);
        }
        // eslint-disable-next-line
    }, [])

    const getValidationSchemaObject = () => {
        let validationObj = {};
        for (let i = 0; i < serviceAviability.length; i++) {
            validationObj[`name${i}`] = Yup.string().required("This field is requird")
            validationObj[`description${i}`] = Yup.string().required("This field is requird")
            validationObj[`duration${i}`] = Yup.number().min(20, "Min time is 20 min").max(480, "Max time is 480 min").required("This field is requird")
            validationObj[`space${i}`] = Yup.number().min(1, "Min number of pers is 1 person").max(9, "Max guests: 9").required("This field is requird")
            validationObj[`price${i}`] = Yup.number().min(1, "Min price of pers is 1 RON").required("This field is requird")
        }
        return validationObj
    }

    const validationSchema = Yup.object().shape(getValidationSchemaObject())

    const getInitialValuesObj = () => {
        if (editMode) {
            let initialObj = {};
            for (let i = 0; i < services.length; i++) {
                initialObj[`name${i}`] = services[i].name;
                initialObj[`description${i}`] = services[i].description;
                initialObj[`duration${i}`] = services[i].duration;
                initialObj[`space${i}`] = services[i].space;
                initialObj[`price${i}`] = services[i].price;
                initialObj[`timeStart${i}`] = services[i].workTime[0];
                initialObj[`timeEnd${i}`] = services[i].workTime[1];
            }
            initialObj.company = '';
            return initialObj
        }
        let initialObj = {};
        for (let i = 0; i < 10; i++) {
            initialObj[`name${i}`] = '';
            initialObj[`description${i}`] = '';
            initialObj[`duration${i}`] = 120;
            initialObj[`space${i}`] = '';
            initialObj[`price${i}`] = '';
            initialObj[`timeStart${i}`] = '06:00';
            initialObj[`timeEnd${i}`] = '23:00';
        }
        initialObj.company = '';
        return initialObj
    }

    const handleChangePeriodStatus = (serviceNumber, dayOfWeek, intervalNumb, index) => {
        let serviceAviabilityCopy = [...serviceAviability];
        if (serviceAviabilityCopy[serviceNumber][index][dayOfWeek].indexOf(intervalNumb) === -1) {
            serviceAviabilityCopy[serviceNumber][index][dayOfWeek].push(intervalNumb)
            serviceAviabilityCopy[serviceNumber][index][dayOfWeek].sort((a, b) => { return a - b });

        } else {
            serviceAviabilityCopy[serviceNumber][index][dayOfWeek] = serviceAviabilityCopy[serviceNumber][index][dayOfWeek].filter((val) => {
                return val !== intervalNumb
            });
        }
        setServiceAviability(serviceAviabilityCopy)

    }

    const setInitialPeriods = (index, duration, timeStart, timeEnd) => {
        if (numberOfSetInitialValuesToSkip <= 1 && editMode) {
            setNumberOfInitialValuesToSkip(numberOfSetInitialValuesToSkip + 1);
            return 0
        }
        const periods = [];
        serviceAviability[index].forEach(dayOfWeek => {

            Object.keys(dayOfWeek).forEach(key => {
                periods.push(
                    {
                        [key]: key === "sat" || key === "sun" ? []
                            : getStartPeriods(duration, timeStart, timeEnd),
                    }
                )
            })
        });
        let list = [...serviceAviability];
        list[index] = periods
        setServiceAviability(list);
    }

    const getStartPeriods = (duration, timeStart, timeEnd) => {
        //RETURNEZ ORE PENTRU O ZI IN FUNCTIE DE NUMARUL DE ORE SI DURATIE
        let step = Number(duration) * 60000;


        const startWorkDay = new Date(`1970-01-01T${timeStart}:00`).getTime()
        const endWorkDay = new Date(`1970-01-01T${timeEnd}:00`).getTime()

        let periods = [];

        let sumOfStepAndTime = startWorkDay;
        while (true) {
            if (sumOfStepAndTime + step > endWorkDay) {
                break;
            }
            if (sumOfStepAndTime >= startWorkDay) {

                periods.push(sumOfStepAndTime)
                sumOfStepAndTime = sumOfStepAndTime + step;

            }

        }
        return periods;
    }

    const handleAddServiceClick = () => {
        if (serviceAviability.length < 10) {
            setServiceAviability([...serviceAviability, [
                { mon: [] },
                { tue: [] },
                { wed: [] },
                { thu: [] },
                { fri: [] },
                { sat: [] },
                { sun: [] },
            ]]);
        }
    }
    const getCurrentService = (values, i) => {
        return {
            name: values[`name${i}`],
            description: values[`description${i}`],
            duration: values[`duration${i}`],
            space: values[`space${i}`],
            price: values[`price${i}`],
            timeStart: values[`timeStart${i}`],
            timeEnd: values[`timeEnd${i}`],
        }
    }

    const handleSubmitServices = (value, { setErrors, ...formProps }) => {
        if (companyID) {

            let servicearr = serviceAviability.map((service, index) => {

                return {
                    name: value[`name${index}`],
                    description: value[`description${index}`],
                    duration: value[`duration${index}`],
                    space: value[`space${index}`],
                    price: value[`price${index}`],
                    workTime: [value[`timeStart${index}`], value[`timeEnd${index}`]],
                    periods: {
                        byAdmin: serviceAviability[index],
                        byGuests: [],
                    },
                }
            })
            props.setPopUpOpen(false);
            if (editMode)
                return dispatch(editServicesThunk({
                    services: servicearr,
                    servicesID: services.map(service => service._id),
                    companyID: companyID
                }))


            return dispatch(addServiceThunk({
                services: servicearr,
                companyID: companyID
            }))
        }
    }

    return (
        <div className="add_service_container">


            <Formik initialValues={getInitialValuesObj()} onSubmit={handleSubmitServices} validationSchema={validationSchema}>
                {
                    formProps => {
                        // debugger
                        return (
                            <Form className="dashboard_add_service">
                                {!companyID && <div className="error_message">Please save the company in the Profile menu if you want to add services</div>}

                                {serviceAviability.map((period, i) => {
                                    return (
                                        <div key={i}>
                                            <Row >
                                                <Col xs={12} lg={6}>
                                                    <Field component={FormInput}
                                                        label="Service name"
                                                        type="text"
                                                        name={`name${i}`}
                                                        inputname="Name"
                                                    />
                                                    <Row>

                                                        <Col xs={6}>
                                                            <Field component={FormInput}
                                                                label="Start work day"
                                                                type="time"
                                                                name={`timeStart${i}`}
                                                                inputname="Start work day" />
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Field component={FormInput}
                                                                label="End work day"
                                                                type="time"
                                                                name={`timeEnd${i}`}
                                                                inputname="End work day" />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col xs={12} lg={6} className="service_input_container">
                                                    <Field component={FormInput}
                                                        label="Time in mins"
                                                        type="number"
                                                        name={`duration${i}`}
                                                        inputname="Duration"
                                                    />
                                                    <Field component={FormInput}
                                                        label="Number of reservations for one hour"
                                                        type="number"
                                                        name={`space${i}`}
                                                        inputname="Space"
                                                    />
                                                    <Field component={FormInput}
                                                        label="Price for service"
                                                        type="number"
                                                        name={`price${i}`}
                                                        inputname="Price"
                                                    />
                                                </Col>
                                            </Row>

                                            <div>

                                                <Field component={FormInput}
                                                    label="Service description"
                                                    type="textarea"
                                                    name={`description${i}`}
                                                    inputname="Description"
                                                />

                                            </div>
                                            <ServiceAviabilityTable setInitialPeriods={setInitialPeriods} formDataServices={getCurrentService(formProps.values, i)} handleChangePeriodStatus={handleChangePeriodStatus} serviceAviability={serviceAviability[i]} index={i} />

                                        </div>
                                    )
                                })}

                                <CustomButton type="submit" >Save Service</CustomButton>
                                <div className="addOtherServiceBtn">
                                    {!editMode && serviceAviability.length < 10 && <span onClick={handleAddServiceClick} >Add other services</span>}
                                </div>

                            </Form>
                        )
                    }
                }
            </Formik>

        </div>
    )
}
export default CompanyServices


