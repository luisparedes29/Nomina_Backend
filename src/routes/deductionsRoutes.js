const express = require("express");
const router = express.Router();
 const {createDeduction, deleteDeduction, getAll} = require('./controllers/deductionsController');

router
.get('/all', getAll)
.post('/create-deduction', createDeduction)
.delete('/delete-deduction', deleteDeduction)

module.exports = router;