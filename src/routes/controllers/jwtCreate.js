const jwt = require('jsonwebtoken');
require('dotenv').config();

function createToken(payload) {
    const expirationTime = new Date(Date.now() + 10 * 60 * 2000); // La duracion es de 20 minutos en milisegundos
    const accessToken = jwt.sign(
        {
            exp: Math.floor(expirationTime / 1000), // Aqui los milisegundos se transforman a 20 minutos al dividirlos entre 1000
            data: payload,
        },
        process.env.SECRET
    );
    return accessToken;
}

module.exports = { createToken };
