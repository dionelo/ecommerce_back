const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const app = express()

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Shop API",
            description: "Backend Api",
            contact: {
                name: 'Amazing Developer'
            },
            servers: "http://localhost:3636"
        }
    },
    apis: ["app.js", ".routes/*.js"]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}))
app.use(logger('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Import routes
const productsRoute = require('./routes/products')
const ordersRoute = require('./routes/orders')
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')

// Define routes
/**
 * @swagger
 * /api/products:
 *   get:
 *    description: Get All Products
 *
 */

// Use routes
app.use('/api/products', productsRoute)
app.use('/api/orders', ordersRoute)
app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)

module.exports = app