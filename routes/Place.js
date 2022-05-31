const express = require('express');
const router = express.Router();
const {getPlaces, createPlace, getPlaceById, updatePlace, deletePlace} = require('../controllers/place');

router.post('/',  createPlace);

router.patch('/:id', updatePlace);

router.delete('/:id', deletePlace);

router.get('/', getPlaces);

router.get('/:id', getPlaceById);


module.exports = router;