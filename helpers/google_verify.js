const {OAuth2Client} = require('google-auth-library');
require('dotenv').config()



const client = new OAuth2Client(process.env.G_CLIENT_ID);

async function googleVerify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.G_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
  });
  const { name: nombre, 
    picture: img, 
    email: correo
  } = ticket.getPayload();
  return { nombre, img, correo };
}


module.exports ={
    googleVerify
}