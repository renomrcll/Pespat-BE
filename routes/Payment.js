const express = require('express');
const router = express.Router();

const {createPayment, getPayments, getPaymentById, updatePayment, deletePayment} = require('../controllers/payment');

router.post('/', createPayment);

router.get('/', getPayments);

router.get('/:id', getPaymentById);

router.patch('/:id', updatePayment);

router.delete('/:id', deletePayment);



module.exports = router;