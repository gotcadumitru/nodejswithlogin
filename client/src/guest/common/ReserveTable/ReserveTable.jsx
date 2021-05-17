import React, { useEffect } from 'react';
import { FaRegTimesCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { getWeek } from '../../../common/helpers/data.helper';

const ReserveTable = ({periodReservedTime,setPeriodReservedTime, companyWithService,nrOfGuestsSelectedFromClient, selectedDay,formProps, ...props }) => {
    useEffect(()=>{
        setPeriodReservedTime(-1)
        // eslint-disable-next-line
    },[nrOfGuestsSelectedFromClient])
    const [timeStart, timeEnd] = companyWithService.serviceWorkTime
    const duration = companyWithService.serviceDuration;
    const serviceAviability = ["mon","tue","wed","thu","fri","sat","sun"];
    const tableTitle = <div className="admin_table_row"><div></div> {serviceAviability.map(dayOfWeek => {
            return <div className="admin_table_col" key={dayOfWeek}>{dayOfWeek.toUpperCase()}</div>
    })} </div>

    const setTimeStringIntervals = () => {

        //setez un array de intervale in functie de ora start/end/duratia serviciului si returnez de ex: ["07:00","08:00","09:00",...]
        const startWorkDay = new Date(`1970-01-01T${timeStart}:00`).getTime()
        const endWorkDay = new Date(`1970-01-01T${timeEnd}:00`).getTime()
        const step = Number(duration) * 60000;
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

    const getAllIndexes = (arr, val) => {
        //caut numarul total de aparitii a unui numar in un array si returnez un array de pozitii
        let indexes = [], i = -1;
        while ((i = arr.indexOf(val, i + 1)) !== -1) {
            indexes.push(i);
        }
        return indexes;
    }

    const changePeriodStatus = (selectedDay,firstDayOfweek,index,intervalSTR) =>{
        //schimb icon la ora pe care a facut userul click
        const selectedDayInMs = getMsFromDate(selectedDay,firstDayOfweek,index,intervalSTR);
         
        if(formProps.errors.time){
            formProps.setErrors({});
        }
        setPeriodReservedTime(selectedDayInMs);
    }
    

    const getMsFromDate = (selectedDay,firstDayOfweek,index,intervalSTR) =>{
        //Am nevoie de toate datele pentru a putea transforma din o zi a anului 1970 in aa/ll/zz/oo prezent ca sa pot face rezervarea 
        return new Date(new Date(selectedDay).getFullYear(),new Date(selectedDay).getMonth(),firstDayOfweek+index,Number(intervalSTR.split(":")[0]),Number(intervalSTR.split(":")[1]))
    }

    return (
        <div className="service_periods_table_container add_service_container custom_scrollbar">

                {tableTitle}
                {Number(duration) >= 20 && companyWithService
                    ? setTimeStringIntervals().map(intervalSTR => {
                        const intervalNumb = new Date(`1970-01-01T${intervalSTR}:00`).getTime()

                        return <div className="admin_table_row" key={intervalSTR}> <div className="admin_table_col">{intervalSTR}</div> {serviceAviability.map((dayOfWeek, index) => {

                            //Aici verific daca o ora din intervalNUMB este in ziua in care adminul a setat
                            const findValuesFromAdmin = getAllIndexes(Object.keys(companyWithService.servicePeriods.byAdmin[index]).map(key => companyWithService.servicePeriods.byAdmin[index][key])[0], intervalNumb)

                            //am nevoie de week number pentru a verifica care dintre zilele rezervate de utilizatori sunt in saptamana ce va fi afisata in tabel
                            //Calculez numarul zilei in saptamana


                            const datenow = new Date(selectedDay).getDate();
                            const dayNow = new Date(selectedDay).getDay();

                            const day = dayNow === 0 ? 6 : dayNow-1

                            const dayNumberOfWeek = dayNow === 0 ? datenow-dayNow+1-7 :  datenow-dayNow+1;
                            const weekNumber = getWeek(new Date(selectedDay)) ;

                            //Mai jos transform din MS ziua reala in MS data de 1 ianuarie 1970 pentru a putea afisa in tabel
                            let allBookTimesFromUsers = companyWithService.servicePeriods.byGuests.map(guest => guest.time);
                            const allBookSelectedWeek = allBookTimesFromUsers.filter(time => getWeek(new Date(time)) === weekNumber);
                            //Transform din data curenta in o data a anului 1970 pentru a putea compara cu interalNumb
                            const intervalsUserStr = allBookSelectedWeek.map(time => new Date(time).toTimeString().split(' ')[0].split(':').slice(0, 2).join(":"));
                            const intervalUserNumb = intervalsUserStr.map(timestr => new Date(`1970-01-01T${timestr}:00`).getTime())
                            //verific daca sunt rezervari facute de un utilizator in intervalSTR
                            let findValuesFromGuest = getAllIndexes(intervalUserNumb, intervalNumb);
                            
                            const weekSelected = getWeek(new Date(periodReservedTime)) 
                            const daySelected =  new Date(periodReservedTime).getDay() === 0 ? 6 : new Date(periodReservedTime).getDay()-1
                            
                            if(periodReservedTime!==-1 && weekSelected === weekNumber && daySelected === index){

                                //Mai jos transform din MS ziua reala in MS data de 1 ianuarie 1970 pentru a putea afisa in tabel
                                const selectedIntervalUserString = new Date(periodReservedTime).toTimeString().split(' ')[0].split(':').slice(0, 2).join(":");
                                const selectedIntervalUserNumber = new Date(`1970-01-01T${selectedIntervalUserString}:00`).getTime();
                                if(selectedIntervalUserNumber === intervalNumb ){
                                    return <div className="admin_table_col" key={`${dayOfWeek} ${periodReservedTime}`}><FaCheckCircle onClick={()=>setPeriodReservedTime(-1)} className="period_reserved" /></div>
                                }
                            }

                            //Verific daca este destul spatiu pentru numarul de persoane ce a selectat utilizatorul
                            if(nrOfGuestsSelectedFromClient>companyWithService.serviceSpace || !findValuesFromAdmin.length || new Date().getTime()> getMsFromDate(selectedDay,dayNumberOfWeek,index,intervalSTR)){
                                return <div className="admin_table_col" key={`${dayOfWeek} ${periodReservedTime}`}><FaRegTimesCircle  className={`period_busy ${day === index ? "selected_day" : ""}`} /></div>
                            }
 

                            const dayOfReservation = findValuesFromGuest.findIndex((ind,inde) =>{
                                 
                                return new Date(allBookSelectedWeek[findValuesFromGuest[inde]]).getDay() -1 === index 
                            })

                            const dayUser = new Date(allBookSelectedWeek[findValuesFromGuest[dayOfReservation]]).getDay()
                            const findIntervalDayNumber = dayUser === 0 ? 6 : dayUser - 1

                            if ((findIntervalDayNumber !== index) || (findValuesFromGuest.length+nrOfGuestsSelectedFromClient <= companyWithService.serviceSpace)) {
                                return <div className="admin_table_col" key={`${dayOfWeek} ${periodReservedTime}`}><FaRegCheckCircle onClick={()=>{changePeriodStatus(selectedDay,dayNumberOfWeek,index,intervalSTR)}} className={`period_free ${day === index ? "selected_day" : ""}`} /></div>
                            }
                           
                            return <div className="admin_table_col" key={`${dayOfWeek} ${periodReservedTime}`}><FaRegTimesCircle className={`period_busy ${day === index ? "selected_day" : ""}`} /></div>//X

                        })}</div>
                    })
                    : ''
                }
        </div>
    )
}


export default ReserveTable;