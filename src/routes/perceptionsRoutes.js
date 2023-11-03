const express = require("express");
const router = express.Router();
const { getAll,  createPerception, deleteOne } = require('./controllers/perceptionsController')

router
.post('/create-perception', createPerception )
.get('/all', getAll)
.delete('/delete-perception/:_id', deleteOne)

module.exports = router