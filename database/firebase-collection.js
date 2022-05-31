const firebase = require('../database/db');
const firestore = firebase.firestore();

const placesCollectionRef = firestore.collection('places');
const reservationsCollectionRef = firestore.collection('reservations');
const usersCollectionRef = firestore.collection('users');
const paymentsCollectionRef = firestore.collection('payments');

module.exports = {
    placesCollectionRef,
    reservationsCollectionRef,
    usersCollectionRef,
    paymentsCollectionRef
}


