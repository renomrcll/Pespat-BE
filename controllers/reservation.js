const firebase = require('../database/db');
const firestore = firebase.firestore();
const {placesCollectionRef} = require('../database/firebase-collection');
const {reservationsCollectionRef} = require('../database/firebase-collection');

const createReservation = async (req, res) => {
    const user_id = req.body.user_id;
    const place_id = req.body.place_id;
    const reservation_time = req.body.reservation_time;
    const status = req.body.status;


    try {
        if (!user_id || !place_id || !reservation_time || !status) {
            throw new Error('Cant create reservation without id, user_id, place_id, reservation_time, or status');
        }
        const reservation = await reservationsCollectionRef.add({ user_id, place_id, reservation_time, status });
        res.status(200).json({ message: 'Reservation created successfully', reservation_id: reservation.id });
    } catch(error) {
        res.status(409).json({ error: error.message });
    }
}

const updateReservation = async (req, res) => {
    const id = req.params.id;
    let user_id = req.body.user_id;
    let place_id = req.body.place_id;
    let reservation_time = req.body.reservation_time;
    let status = req.body.status;
    const docRef = reservationsCollectionRef.doc(id);
    const originalData_temp = await docRef.get();
    const originalData = originalData_temp.data();
    try {
            user_id = user_id ? user_id : originalData.user_id;
            place_id = place_id ? place_id : originalData.place_id;
            reservation_time = reservation_time ? reservation_time : originalData.reservation_time;
            status = status ? status : originalData.status;
            
        const reservation = await docRef.update({ user_id, place_id, reservation_time, status });
        res.status(200).json({ message: 'Reservation updated successfully', reservation_id: id });
    } catch(error) {
        res.status(409).json({ error: error.message });
    }
}


const deleteReservation = async (req, res) => {
    try {
        if(!req.params.id) {
            throw new Error('Cant delete reservation without id');
        }
        const docRef = reservationsCollectionRef.doc(req.params.id);
        await docRef.delete();
        res.status(200).json({ message: 'reservation deleted successfully'});
    } catch(error) {
        res.status(409).json({ error: error.message });
    }

}


const getReservations = async (req, res) => {
    try {
        const reservations = await reservationsCollectionRef.get();
        const reservationsArray = reservations.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        res.status(200).json(reservationsArray);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getReservationById = async (req, res) => {
    try {
        const id = req.params.id;
        const docRef = reservationsCollectionRef.doc(id);
        const reservation = await docRef.get();
        res.status(200).json(reservation.data());
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    createReservation,
    updateReservation,
    deleteReservation,
    getReservations,
    getReservationById
}