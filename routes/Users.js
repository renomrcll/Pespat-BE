const express = require('express');
const router = express.Router();
const {loginUser, createUser, getUser,updateUser} = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

router.post('/login',loginUser)

router.post('/register', createUser);

router.patch('/:id', checkAuth, updateUser);

router.get('/:id',checkAuth,getUser);

module.exports = router;