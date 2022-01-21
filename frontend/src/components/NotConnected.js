import React, {useEffect} from 'react'
import {Container, Row, Button, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {stripeAccountAction} from '../actions/stripeActions'
import { MessageDanger } from './Message'
import { useNavigate } from 'react-router-dom'

const NotConnected = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const stripeAccountReducer = useSelector(state=>state.stripeAccountReducer)
  const {loading, userAccount, error} = stripeAccountReducer

  useEffect(()=>{
    if (userAccount){
      navigate(`/user/stripe-account/${userAccount._id}`)
    }
  },[navigate, userAccount])

  const handleClick = () => {
    dispatch(stripeAccountAction())
  }

  return (
    <Container fluid className='p-3'>
      {error && <MessageDanger>{error} </MessageDanger>}
      <Row  className='d-flex justify-content-center'>
        <Col md={6} className='d-flex flex-column justify-content-center'>
          <h1 className='mx-auto' style={{fontSize: '36px'}}>
            <span style={{fontSize: '36px'}} className="material-icons text-secondary">apartment</span>
          </h1>
          <h4 className='mx-auto'>
            Setup payouts to post hotel rooms
          </h4>
          <p className='lead mx-auto'>
            MERN partners with stripe to transfer earnings to your bank account
          </p>
          <Button className='mx-auto mb-3' onClick={handleClick}>
            {loading? (<> <span className="spinner-border spinner-border-sm"></span>Loading..</>):(<>Setup Payouts</> )} 
            
          </Button>
          <p className='text-muted mx-auto'>
            You will be redirected to stripe to complete the onboarding process
          </p>
        </Col>
      </Row>  
    </Container>
  )
}

export default NotConnected