const registerUser = async (req, res) => {
   res.send('Registrando usuario')
}

const loginUser = async (req, res) => {
    res.send('Logeando usuario')
}


module.exports = {registerUser, loginUser}