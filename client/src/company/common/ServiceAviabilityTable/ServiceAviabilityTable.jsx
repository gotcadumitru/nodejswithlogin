import React, { useEffect} from 'react';
import './ServiceAviabilityTable.css'
import { FaRegTimesCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
const ServiceAviabilityTable = ({formDataServices,...props}) => {
    const {timeStart,timeEnd,duration} = formDataServices;
    useEffect(() => {
        if(Number(duration)>=10)
            props.setInitialPeriods(props.index,duration,timeStart,timeEnd);
            // eslint-disable-next-line
    }, [timeStart,timeEnd,duration])

    const tableTitle = <div className="admin_table_row title"> <div className="admin_table_col"/>{props.serviceAviability.map(dayOfWeek => {
        return Object.keys(dayOfWeek).map(key => {
            return <div key={key} className="admin_table_col" xs={2}>{key.toUpperCase()}</div>
        })
    })} </div>

    const setTimeStringIntervals = () => {
        const startWorkDay = new Date(`1970-01-01T${timeStart}:00`).getTime()
        const endWorkDay = new Date(`1970-01-01T${timeEnd}:00`).getTime()

        let step = Number(duration) * 60000;

        let sumOfStepAndTime = startWorkDay;

        let timePeriodsString = [];
        while (true) {
            if (sumOfStepAndTime + step > endWorkDay) {
                break;
            }
            if (sumOfStepAndTime >= startWorkDay) {

                timePeriodsString.push(new Date(sumOfStepAndTime).toTimeString().split(' ')[0].split(':').slice(0, 2).join(":"))
                sumOfStepAndTime = sumOfStepAndTime + step;
            }

        }
        return timePeriodsString;
    }




    return (
        <div  className="service_periods_table_container custom_scrollbar">
                {tableTitle}
                {  Number(duration) >= 20
                    ? setTimeStringIntervals().map(intervalSTR => {
                    const intervalNumb = new Date(`1970-01-01T${intervalSTR}:00`).getTime()
                    return <div key={intervalSTR} className="admin_table_row"> <div className="admin_table_col title">{intervalSTR}</div> {props.serviceAviability.map((dayOfWeek, index) => {
                        return Object.keys(dayOfWeek).map(key => {
    
                            return <div key={key} className="admin_table_col" onClick={() => props.handleChangePeriodStatus(props.index,key, intervalNumb, index)}>
                                {dayOfWeek[key].indexOf(intervalNumb) === -1 ? <FaRegTimesCircle className="period_busy" /> : <FaRegCheckCircle className="period_free" />}</div>
                        })
                    })}</div>
                })
                : ''
            }
        </div>
    )
}
export default ServiceAviabilityTable;