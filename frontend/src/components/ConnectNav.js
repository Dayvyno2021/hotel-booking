import React from 'react'
import {useSelector} from 'react-redux'
import { Container, Card, Col, Row } from 'react-bootstrap'

const ConnectNav = () => {
  const userLoginReducer = useSelector(state => state.userLoginReducer)
  const {user} = userLoginReducer
  return (
    <Container fluid >
      <Row className='d-flex justify-content-around'>
        <Col sm={5} md={4} lg={3} xl={2}>
        <Card>
          <Row className='d-flex justify-content-center mt-2'> 
            <Col sm={5} >
              <Card.Title className='d-flex justify-content-center'>  
                <h3 className='avatar-dayve d-flex justify-content-center align-items-center'>
                  {user.name[0]}
                </h3>
              </Card.Title>
            </Col>         
          </Row>
          <Card.Body className='d-flex justify-content-center flex-column' >    
            <Card.Title className='d-flex justify-content-center' >{user.name} </Card.Title>
            <Card.Text className='d-flex justify-content-center' >{`Joined ${user.createdAt.substring(0, 10)}`}</Card.Text>
          </Card.Body>
        </Card>
        </Col>
        {
          user && user.stripe_seller && user.stripe_seller.charges_enabled && 
          <>
            <Col >Pending Balance</Col>
            <Col >Payout Balance</Col>
          </>
        }
      </Row>
      
    </Container>
  )
}

export default ConnectNav