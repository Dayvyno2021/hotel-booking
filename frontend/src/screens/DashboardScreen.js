import React from 'react'
import {Button, Col, Container, Row} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import Loader from '../components/Loader'
import {MessageDanger} from '../components/Message'
import DashboardNav from '../components/DashboardNav'
import ConnectNav from '../components/ConnectNav'
import { Link } from 'react-router-dom'

const DashboardScreen = () => {

  const userLoginReducer  = useSelector(state => state.userLoginReducer )
  const {loading, user, error} = userLoginReducer 


  return (   
    <>
      {loading && <Loader/> }
      {error && <MessageDanger> {error} </MessageDanger>}
      {user && 
      <>
        <Container fluid className='bg-secondary p-3'>
          <ConnectNav />
        </Container>
        
        <Container fluid className='p-4'>
          <DashboardNav />
        </Container>

        <Container fluid className='p-3 '>
          <Row >
            <Col xs={12} sm={8} md={9} className='hotel-booking'>
              <h2>Your Bookings</h2>
            </Col>
            <Col xs={12} sm={4} md={3} className='hotel-booking hotel-booking-2'>
              <Link to={'/'}>
                <Button className='buttonBooking'>
                  Browse Hotels
                </Button>
              </Link>
            </Col>
          </Row>
          
        </Container>
      </> }

    </>
  )
}

export default DashboardScreen
