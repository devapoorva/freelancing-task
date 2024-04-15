import React from 'react';
import './Calender.scss';
import Calendar from 'react-calendar';

function AppCalendar({ selectedDate, onDateChange }){

    const tileDisabled = ({ date }) => {
        const today = new Date(); 
        return date < today || date.getDay() === 0 || date.getDay() === 6;
    };

    return (
        <>
            <Calendar
                value={selectedDate}
                onChange={onDateChange}
                tileDisabled={tileDisabled}
            />
        </>
    );
}
export default AppCalendar;