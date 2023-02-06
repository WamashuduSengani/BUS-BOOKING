import React from 'react';
import { useState, useEffect } from 'react';

export function useDefault() {
    return {
        DEFAULT_DEPART,
        DEFAULT_ARRIVE,
        PASSENGERS_LIST,
        DESTINATION_PRICES,
        VALIDATE_RETURN_DATE,
        VALIDATE_ONEWAY_DATE,
        VALIDATE_PASSENGER,
    };
}

const LOCATIONS = {
    JOHANNESBURG: 'JOHANNESBURG',
    DURBAN: 'DURBAN',
    CAPETOWN: 'CAPE TOWN',
};

const DEFAULT_DEPART = [
    'Select a Departure City',
    LOCATIONS.JOHANNESBURG,
    LOCATIONS.DURBAN,
    LOCATIONS.CAPETOWN,
];

const DEFAULT_ARRIVE = [
    'Select a Arrival City',
    LOCATIONS.JOHANNESBURG,
    LOCATIONS.DURBAN,
    LOCATIONS.CAPETOWN,
];

const PASSENGERS_LIST = [];
PASSENGERS_LIST.push('Select the Number of Passengers');
PASSENGERS_LIST.push(...[...Array(10).keys()].map((i) => i + 1));

function DESTINATION_PRICES(depart_city, arrival_city, passengersNo) {
    let message = '';
    let success = true;

    const prices = {
        [`${LOCATIONS.JOHANNESBURG}-${LOCATIONS.DURBAN}`]: 1250,
        [`${LOCATIONS.JOHANNESBURG}-${LOCATIONS.CAPETOWN}`]: 1800,
        [`${LOCATIONS.DURBAN}-${LOCATIONS.JOHANNESBURG}`]: 1000,
        [`${LOCATIONS.DURBAN}-${LOCATIONS.CAPETOWN}`]: 1250,
        [`${LOCATIONS.CAPETOWN}-${LOCATIONS.JOHANNESBURG}`]: 1500,
        [`${LOCATIONS.CAPETOWN}-${LOCATIONS.DURBAN}`]: 1100,
    };

    const locationSet = new Set(Object.values(LOCATIONS));

    if (!locationSet.has(depart_city) || !locationSet.has(arrival_city)) {
        message = 'Invalid departure or arrival city. Please enter a valid city from the list of available cities.'
        success = false
        return { success, message }
    }

    const basePrice = prices[`${depart_city}-${arrival_city}`];
    if (!basePrice) {
        message = 'Invalid date entered. Please enter a valid date in the format of yyyy-mm-dd'
        success = false
        return { success, message }
    }

    const f = Intl.NumberFormat('en-us', {
        currency: 'ZAR',
        style: 'currency',
    });
    const price = f.format(basePrice * passengersNo)

    return {success, message, price}
}

function VALIDATE_PASSENGER(passengersNo) {
    let message = '';
    let success = true;

    const passengers = Number(passengersNo)

    if (isNaN(passengers) || passengers <= 0 || passengers > 10) {
        message = 'Invalid number of passengers selection. Please enter a valid number between 1 and 10.';
        success = false;
    } else {
        message = 'The Date selection is Successful';
        success = true;
    }

    return { success, message };
}

function VALIDATE_RETURN_DATE(departure_date, return_date) {
    let message = '';
    let success = true;

    const departure = Date.parse(departure_date);
    const returning = Date.parse(return_date);
    if (isNaN(departure) || isNaN(returning)) {
        message = 'Invalid date format, please enter date in yyyy-mm-dd format';
        success = false;
    } else if (departure >= returning || departure < Date.now() || returning < Date.now()) {
        message = 'Invalid date selection, departure date should be before return date and after the current date';
        success = false;
    } else {
        message = 'The date selection is successful';
        success = true;
    }
    return { success, message };
}

function VALIDATE_ONEWAY_DATE(departure_date) {
    let message = '';
    let success = true;

    const departure = Date.parse(departure_date);

    if (isNaN(departure) || departure < Date.now()) {
        message = 'Invalid date selection, departure date should be after the current date';
        success = false;
    } else {
        message = 'The date selection is successful';
        success = true;
    }
    return { success, message };
}