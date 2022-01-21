import React from 'react'
import {Container} from 'react-bootstrap'
import { useSelector } from 'react-redux'
// import {Link} from 'react-router-dom'
import Loader from '../components/Loader'
import {MessageDanger} from '../components/Message'
import DashboardNav from '../components/DashboardNav'
import ConnectNav from '../components/ConnectNav'
import Connected from '../components/Connected'
import NotConnected from '../components/NotConnected'

const DashboardSellerScreen = () => {

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

        {
          user && user._id && user.stripe_seller && user.stripe_seller.charges_enables?
         
         <div className='d-flex justify-content-center'>
           <Connected/> 
         </div> 
          : 
          <div className='d-flex justify-content-center'>
            <NotConnected />
          </div>
        }
        {/* <pre>{JSON.stringify(user, null, 4)} </pre> */}

      </> }

    </>
  )
}

export default DashboardSellerScreen