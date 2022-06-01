const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {usersCollectionRef} = require('../database/firebase-collection');
const {APP_SECRET} = require('../config/config');

const {loginValidator, registerValidator,confirmPasswordValidator,forgotPasswordValidator} = require('../validators/validators');


const loginUser = async (req,res)=>{
    const {errors, isValid} = loginValidator(req.body);
    if(!isValid){
        res.json({success: false, errors});
    } else {
        const {email, password} = req.body;
        const user = await usersCollectionRef.where('email', '==', email).get();
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
                    res.json({userData, success: true, token: 'Bearer ' + token,message: 'Login successful',user_id : user.docs[0].id});
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
        const user = await usersCollectionRef.where('email', '==', email).get();
        if(user.empty){
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const newUser = {
                firstName,
                lastName,
                email,
                password: hash
            }
            const user = await usersCollectionRef.add(newUser);
            res.json({success: true, user: newUser, message: 'User created successfully', user_id: user.id});
        } else {
            errors.email = 'Email already exists';
            res.json({success: false, errors});
        }
    }
}

const getUser = async (req,res)=>{
    const id = req.params.id;
    const user = await usersCollectionRef.doc(id).get();
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
        const id = req.params.id;
        let {firstName, lastName, email} = req.body;
        const docRef = usersCollectionRef.doc(id);
        const originalData_temp = await docRef.get();
        const originalData = originalData_temp.data();
        try{
            if(originalData_temp.exists){
                firstName = firstName ? firstName : originalData.firstName;
                lastName = lastName ? lastName : originalData.lastName;
                email = email ? email : originalData.email;
                await usersCollectionRef.doc(id).update({firstName, lastName, email});
                res.json({success: true, message: 'User updated successfully', user_id: id});
            } else {
                errors.email = 'User not found';
                res.json({success: false, errors});
            }
        }catch(err){
            res.json({success: false, error: err});
        }   
    
}

const deleteUser = async (req, res)=>{
    const id = req.params.id;
    const user = await usersCollectionRef.doc(id).get();
    try{
        if(user.exists){
            await usersCollectionRef.doc(id).delete();
            res.json({success: true, message: 'User deleted successfully'});
        } else {
            res.json({success: false, error: 'User not found'});
        }
    }catch(err){
        res.json({success: false, error: err});
    }
}

const changePassword = async (req, res)=>{
    const {errors, isValid} = confirmPasswordValidator(req.body);
    if(!isValid){
        res.json({success: false, errors});
    } else {
        const id = req.params.id;
        const {password} = req.body;
        const user = await usersCollectionRef.doc(id).get();
        try{
            if(user.exists){
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);
                await usersCollectionRef.doc(id).update({password: hash});
                res.json({success: true, message: 'Password changed successfully'});
            } else {
                errors.email = 'User not found';
                res.json({success: false, errors});
            }
        }catch(err){
            res.json({success: false, error: err});
        }   
    }
}




module.exports = {loginUser, createUser, getUser, updateUser,deleteUser,changePassword};