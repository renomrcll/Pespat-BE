const express = require('express');
const router = express.Router();
const {createReservation, getReservations, getReservationById, updateReservation, deleteReservation} = require('../controllers/reservation');

router.post('/', createReservation);

router.get('/', getReservations);

router.get('/:id', getReservationById);

router.patch('/:id', updateReservation);

router.delete('/:id', deleteReservation);



module.exports = router;