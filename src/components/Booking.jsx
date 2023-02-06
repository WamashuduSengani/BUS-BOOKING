import React from "react";
import "./styles/Booking/Booking.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation, faPersonWalkingLuggage } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { BookingReturn } from "./Booking.Return";
import { BookingOneWay } from "./Booking.OneWay";
import { useBookingContext } from "../contexts/BookingsProvider";
import { motion } from "framer-motion";

export default function Booking() {
    const [formToggle, setFormToggle] = useState(true)
    const { error } = useBookingContext()

    function viewReturnForm(e) {
        e.preventDefault()
        setFormToggle(true)
    }

    function viewOneWayForm(e) {
        e.preventDefault()
        setFormToggle(false)
    }

    return (
        <div className="booking_container">
            {error && <div className="alert alert_danger">{error}</div>}
            <h1>Search and Book Your Bus Ticket</h1>
            <div className="booking_selection_wrapper">
                <div className="trip_type">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }} onClick={viewReturnForm}>Return
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }} onClick={viewOneWayForm}>One Way
                    </motion.button>
                </div>
                {formToggle ? <BookingReturn /> : <BookingOneWay />}
            </div>
        </div>
    );
}
