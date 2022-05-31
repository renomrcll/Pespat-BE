'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    API_KEY,
    AUTH_DOMAIN,
    STORAGE_BUCKET,
    PROJECT_ID,
    MESSAGING_SENDER_ID,
    APP_ID,
    APP_SECRET,
} = process.env;
 
assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
    port : PORT,
    host : HOST,
    hostUrl : HOST_URL,
    firebaseConfig : {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID
      }, 
    APP_SECRET : APP_SECRET
}

