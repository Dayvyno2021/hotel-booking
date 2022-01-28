import React, {useEffect} from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import { allHotelsAction, deleteHotelAction } from '../actions/hotelActions';
import Loader from '../components/Loader'
import {MessageDanger} from '../components/Message'
import SmallCard from '../components/SmallCard';
import { useLocation } from 'react-router-dom';

const HomeScreen = () => {

  const dispatch = useDispatch();
  const location = useLocation()

  const searchParams = location.search.split('=')[1]
  console.log(searchParams)

  const allHotelsReducer = useSelector(state=>state.allHotelsReducer)
  const {loading, hotels, error} = allHotelsReducer

    const deleteHotelReducer = useSelector(state=>state.deleteHotelReducer)
  const {
    loading: loadingDel, 
    success: successDel, 
    error: errorDel
  } = deleteHotelReducer

  const deleteHotel= (id, user) =>{
    if (user.isAdmin ===true){
      if (window.confirm("Delete hotel?")){
        dispatch(deleteHotelAction(id))
      }
    } else{
      window.alert('Only software Admins are allowed to delete hotels')
    }
  }

  useEffect(() => {
    dispatch(allHotelsAction())
  }, [dispatch, successDel]);


  

  return (
    <Container className='p-3 justify-content-center mx-auto m-3'>
      {loading && <Loader />}
      {error && <MessageDanger>{error} </MessageDanger>} 
      {loadingDel && <Loader />}
      {errorDel && <MessageDanger>{errorDel} </MessageDanger>} 
        <h1 className='addHotel text-center'>All Hotels</h1>
      
        <Row className='my-3'>
      {hotels && hotels.map(hotel=>(
        <Col key={hotel._id} xs={12} className='my-2 border border-secondary border-2 rounded p-2 cdDayve bg-light'>
          <SmallCard hotel={hotel} deleteHotel={deleteHotel}/>
        </Col>
      ))}
      </Row>

    </Container>
  )
}

export default HomeScreen
