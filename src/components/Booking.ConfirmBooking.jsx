import React from 'react'
import '../components/styles/ConfirmBookingModal/ConfirmBookingModal.css'


export function BookingConfirmBooking() {
    return (
        <>
            <div className="modal">
                <table>
                    <thead>
                        <tr>
                            <th>Departure City</th>
                            <th>Arrival City</th>
                            <th>Departure Date</th>
                            <th>Passengers Number</th>
                            <th>Confirm</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label={'Departure City'}>JOHANNESBURG</td>
                            <td data-label={'Arrival City'}>DURBAN</td>
                            <td data-label={'Departure Date'}>25 Janunary 2020</td>
                            <td data-label={'Arrival Date'}>-- --</td>
                            <td data-label={'Passengers Number'}>2</td>
                            <td><button>Confirm</button></td>
                        </tr>
                    </tbody>
                </table>
                <button className='cancelBooking'>Cancel</button>
            </div>
        </>
    )
}
