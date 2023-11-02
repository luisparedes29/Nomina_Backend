const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')


const companyRouter = require('./routes/companyRoutes')
const userRouter = require('./routes/userRoutes')
const employeesRouter = require('./routes/employeesRoutes')


const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(compression())
app.use(helmet())
app.use(cors())
app.disable('x-powered-by')
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/company', companyRouter)
app.use('/user', userRouter)
app.use('/employee', employeesRouter)

module.exports = app
