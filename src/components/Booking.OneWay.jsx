import React from "react";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocation,
    faPersonWalkingLuggage,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { useDefault } from "../hooks/useDefault";

export function BookingOneWay() {
    const { DEFAULT_DEPART, DEFAULT_ARRIVE, PASSENGERS_LIST } = useDefault();
    const [departSelection, setDepartSelection] = useState("");
    const departureCityRef = useRef();
    const arrivalCityRef = useRef();
    const departureDateRef = useRef();
    const returnDateRef = useRef();
    const passengersNoRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        const booking = {
            departureCity: departureCityRef.current.value,
            arrivalCity: arrivalCityRef.current.value,
            departureDate: departureDateRef.current.value,
            returnDate: returnDateRef.current.value,
            passengersNo: passengersNoRef.current.value,
        };
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <div className="input_wrapper">
                    <FontAwesomeIcon icon={faLocation} />
                    <select
                        ref={departureCityRef}
                        name="depart_city"
                        id="depart_city"
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

                <div className="input_wrapper">
                    <FontAwesomeIcon icon={faLocation} />
                    <select ref={arrivalCityRef} name="arrival_city" id="arrival_city">
                        {DEFAULT_ARRIVE.filter(value => value !== departSelection).map((location) => {
                            return (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="input_wrapper">
                    <FontAwesomeIcon icon={faCalendar} />
                    <input
                        ref={departureDateRef}
                        type="date"
                        name="departure_date"
                        id="departure_date"
                    />
                </div>

                <div className="input_wrapper">
                    <FontAwesomeIcon icon={faPersonWalkingLuggage} />
                    <select ref={passengersNoRef} name="passengers" id="passengers">
                        {PASSENGERS_LIST.map((passenger) => {
                            return (
                                <option key={passenger} value={passenger}>
                                    {passenger}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <button type="submit">Book Now</button>

            </form>
        </>
    );
}
