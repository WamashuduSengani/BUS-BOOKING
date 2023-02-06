import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLocation,
    faPersonWalkingLuggage,
} from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { useDefault } from '../hooks/useDefault';
import { BookingConfirmBooking } from './Booking.ConfirmBooking';
import { useBookingContext } from '../contexts/BookingsProvider';
import { motion } from 'framer-motion';

export function BookingReturn() {
    const {
        DEFAULT_DEPART,
        DEFAULT_ARRIVE,
        PASSENGERS_LIST,
        VALIDATE_PASSENGER,
        DESTINATION_PRICES,
        VALIDATE_RETURN_DATE,
    } = useDefault();
    const [departSelection, setDepartSelection] = useState('');
    const [success, setSuccess] = useState(false)
    const departureCityRef = useRef();
    const arrivalCityRef = useRef();
    const departureDateRef = useRef();
    const returnDateRef = useRef();
    const passengersNoRef = useRef();
    const { setError } = useBookingContext();

    function handleSubmit(e) {
        e.preventDefault();

        const booking = {
            departureCity: departureCityRef.current.value,
            arrivalCity: arrivalCityRef.current.value,
            departureDate: departureDateRef.current.value,
            returnDate: returnDateRef.current.value,
            passengersNo: Number(passengersNoRef.current.value),
        };

        const priceStatus = DESTINATION_PRICES(
            booking.departureCity,
            booking.arrivalCity,
            booking.passengersNo
        );
        const dateStatus = VALIDATE_RETURN_DATE(
            booking.departureDate,
            booking.returnDate
        );
        const passengerNoStatus = VALIDATE_PASSENGER(booking.passengersNo);

        if (!priceStatus.success) {
            return setError(priceStatus.message);
        }

        if (!dateStatus.success) {
            return setError(dateStatus.message);
        }

        if (!passengerNoStatus.success) {
            return setError(passengerNoStatus.message);
        }

        return [setError(''), setSuccess(true)];
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='input_wrapper'>
                    <FontAwesomeIcon icon={faLocation} />
                    <select
                        ref={departureCityRef}
                        name='depart_city'
                        id='depart_city'
                        onChange={(e) => setDepartSelection(e.target.value)}
                    >
                        {DEFAULT_DEPART.map((location) => {
                            return (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className='input_wrapper'>
                    <FontAwesomeIcon icon={faLocation} />
                    <select ref={arrivalCityRef} name='arrival_city' id='arrival_city'>
                        {DEFAULT_ARRIVE.filter((value) => value !== departSelection).map(
                            (location) => {
                                return (
                                    <option key={location} value={location}>
                                        {location}
                                    </option>
                                );
                            }
                        )}
                    </select>
                </div>

                <div className='input_wrapper'>
                    <FontAwesomeIcon icon={faCalendar} />
                    <input
                        ref={departureDateRef}
                        type='date'
                        name='departure_date'
                        id='departure_date'
                    />
                </div>

                <div className='input_wrapper'>
                    <FontAwesomeIcon icon={faCalendar} />
                    <input
                        ref={returnDateRef}
                        type='date'
                        name='return_date'
                        id='return_date'
                    />
                </div>

                <div className='input_wrapper'>
                    <FontAwesomeIcon icon={faPersonWalkingLuggage} />
                    <select ref={passengersNoRef} name='passengers' id='passengers'>
                        {PASSENGERS_LIST.map((passenger) => {
                            return (
                                <option key={passenger} value={passenger}>
                                    {passenger}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    type='submit'
                >
                    Book Now
                </motion.button>
            </form>
            {success && <BookingConfirmBooking />}
        </>
    );
}
