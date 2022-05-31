const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const firebase = require('../database/db');
const firestore = firebase.firestore();
const {APP_SECRET} = require('../config/config');

const {loginValidator, registerValidator} = require('../validators/validators');


const loginUser = async (req,res)=>{
    const {errors, isValid} = loginValidator(req.body);
    if(!isValid){
        res.json({success: false, errors});
    } else {
        const {email, password} = req.body;
        const user = await firestore.collection('users').where('email', '==', email).get();
        if(user.empty){
            errors.email = 'User not found';
            res.json({success: false, errors});
        } else {
            const userData = user.docs[0].data();
            const isMatch = await bcrypt.compare(password, userData.password);
            if(!isMatch){
                errors.password = 'Password is incorrect';
                res.json({success: false, errors});
            } else {
                const payload = {
                    name: userData.firstName,
                    email: userData.email
                }
                jwt.sign(payload, APP_SECRET, {expiresIn: '2155926'}, (err, token)=>{
                    res.json({userData, success: true, token: 'Bearer ' + token,message: 'Login successful'});
                });
            }
        }
    }
}

const createUser = async (req, res)=>{
    const {errors, isValid} = registerValidator(req.body);
    if(!isValid){
        res.json({success: false, errors});
    } else {
        const {firstName, lastName, email, password} = req.body;
        const user = await firestore.collection('users').where('email', '==', email).get();
        if(user.empty){
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const newUser = {
                firstName,
                lastName,
                email,
                password: hash
            }
            await firestore.collection('users').add(newUser);
            res.json({success: true, user: newUser, message: 'User created successfully'});
        } else {
            errors.email = 'Email already exists';
            res.json({success: false, errors});
        }
    }
}

const getUser = async (req,res)=>{
    const id = req.params.id;
    const user = await firestore.collection('users').doc(id).get();
    try {
        if(!user.exists){
            res.json({success: false, error: 'User not found'});
        } else {
            res.json({success: true, user: user.data(),message:"User found"});
        }
    }
    catch(err){
        res.json({success: false, error: err});
    }
}

const updateUser = async (req, res)=>{
    const {errors, isValid} = registerValidator(req.body);
    if(!isValid){
        res.json({success: false, errors});
    } else {
        const id = req.params.id;
        const {firstName, lastName, email, password} = req.body;
        const user = await firestore.collection('users').doc(id).get();
        try{
            if(user.exists){
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);
                const newUser = {
                    firstName,
                    lastName,
                    email,
                    password: hash
                }
                await firestore.collection('users').doc(id).update(newUser);
                res.json({success: true, user: newUser ,message: 'User updated successfully'});
            } else {
                errors.email = 'User not found';
                res.json({success: false, errors});
            }
        }catch(err){
            res.json({success: false, error: err});
        }   
    }
}


module.exports = {loginUser, createUser, getUser, updateUser};