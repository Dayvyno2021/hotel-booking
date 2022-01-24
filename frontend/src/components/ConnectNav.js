import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Container, Card, Col, Row } from 'react-bootstrap'
import { accountBalanceAction } from '../actions/stripeActions'
import Loader from './Loader'
import {MessageDanger} from './Message'

const ConnectNav = () => {

  const dispatch = useDispatch()

  const userLoginReducer = useSelector(state => state.userLoginReducer)
  const {user} = userLoginReducer

  const accountBalanceReducer = useSelector(state=>state.accountBalanceReducer)
  const {loading, balance, error} = accountBalanceReducer

  useEffect(() => {
    if (!balance){
      dispatch(accountBalanceAction())
    }
  }, [dispatch, balance]);
  

  return (
    <Container fluid >
      {loading && <Loader/>}
      {error && <MessageDanger>{error} </MessageDanger>}
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
            <Col >
              <h5 style={{textDecoration: 'underline'}} className='text-light'>
                Pending Balance
              </h5>
              <h5 className={`badge ${balance>2? 'bg-success' : 'bg-danger'}`}>
                {`NGN ${Number(balance).toLocaleString()}`} 
              </h5>
            </Col>
            <Col >
             <h5 className='text-light'> Payout Balance</h5>
            </Col>
          </>
        }
      </Row>
      
    </Container>
  )
}

export default ConnectNav