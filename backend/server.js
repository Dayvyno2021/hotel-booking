import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import cors from 'cors'
import { notFound } from './middleware/errorMiddleware.js'
import userRoute from './routes/userRoute.js'
import stripeRoute from './routes/stripeRoute.js'
import hotelRoutes from './routes/hotelRoutes.js'
const app  = express()

dotenv.config()
import connectDB from './config/db.js'
connectDB()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('App is working')
})

app.use('/api/user', userRoute)
app.use('/api', stripeRoute)
app.use('/api', hotelRoutes)

app.use(notFound)

const PORT = process.env.PORT || 3500
const NODE_ENV = process.env.NODE_ENV
app.listen(PORT, 
  ()=>console.log(`======>>server running in ${NODE_ENV} on ${PORT}`.rainbow))