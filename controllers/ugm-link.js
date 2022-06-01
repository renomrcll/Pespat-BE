const { default: axios } = require('axios');
const jwt = require('jsonwebtoken');
const { usersCollectionRef } = require('../database/firebase-collection');

const renderLoginPage = async (req, res) => {
  res.render('ugm-link-login', { clientId: process.env.CLIENT_ID });
}

const renderRedirectPage = async (req, res) => {
  res.render('ugm-link-redirect');
}

const exchangeAuthToken = async (req, res) => {
  try {
    const { authToken, bearerToken } = req.body;

    const accessTokenResponse = await axios.post(`https://ugm-auth.vercel.app/api/auth/get-access-token`, {
      authToken: authToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    })
  
    const { accessToken } = accessTokenResponse.data

    const { student: { id: studentId } } = jwt.decode(accessToken)
    const studentDataResponse = await axios.get(`https://ugm-auth.vercel.app/api/identity/${studentId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    const studentData = studentDataResponse.data
  
    const [_, rawJwt] = bearerToken.split(' ');
    const { email: userEmail } = jwt.decode(rawJwt);
  
    const user = await usersCollectionRef.where('email', '==', userEmail).get();
    const { firstName, lastName, email } = user.docs[0].data();
    await usersCollectionRef.doc(user.docs[0].id).update({ firstName, lastName, email, ugmData: studentData });

    console.log(user.docs[0].data());

    res.send({ success: true, message: 'Identity linking successful.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: true, message: 'Identity linking failed.' });
  }
}

const getUgmData = async (req, res) => {
  const id = req.params.id;

  const user = await usersCollectionRef.doc(id).get();

  try {
    if(!user.exists){
      res.json({success: true, user: null ,message:"User not found."});
      return   
    }

    const data = user.data()?.ugmData;
    
    if (data) {
      res.json({success: true, ugmData: data,message:"UGM identity found."});
    } else {
      res.json({success: false, ugmData: null,message:"Account not yet linked."});
    }
  }
  catch(err){
    console.error(err)
    res.json({success: false, error: err});
  }
}

module.exports = {
  renderLoginPage,
  renderRedirectPage,
  exchangeAuthToken,
  getUgmData
}