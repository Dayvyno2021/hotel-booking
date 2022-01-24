import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {singleHotelAction} from '../actions/hotelActions'
import Loader from '../components/Loader'
import {MessageDanger} from '../components/Message'
import {Row, Col, Form, Button} from 'react-bootstrap'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditHotelScreen = () => {

  const dispatch = useDispatch();
  const params = useParams();

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState("")
  const [price, setPrice] = useState(0)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [bed, setBed] = useState('')
    
  
    const [preview, setPreview] = useState(
      'https:via.placeholder.com/100x100.png?text=PREVIEW'
      )

  const handleSubmit=(e)=>{
    e.preventDefault();

    const hotelEditData = new FormData()
    hotelEditData.append('title', title)
    hotelEditData.append('content', content)
    hotelEditData.append('location', location)
    hotelEditData.append('image', image)
    hotelEditData.append('price', price)
    hotelEditData.append('from', from)
    hotelEditData.append('to', to)
    hotelEditData.append('bed', bed)
    
  }

  const imageHandler = (e) =>{
    const file = e.target.files[0]
    setPreview(URL.createObjectURL(file))
    setImage(file)
  }

  const singleHotelReducer = useSelector(state=>state.singleHotelReducer)
  const {loading, anHotel, error} = singleHotelReducer

  useEffect(() => {
    console.log('times')
    if (!anHotel){
      dispatch(singleHotelAction(params.id))
    }else{
      const from2 = new Date(anHotel.from)
      const to2 = new Date(anHotel.to)
      setTitle(anHotel.title)
      setContent(anHotel.content)
      setLocation(anHotel.location)
      setPrice(anHotel.price)
      setFrom(from2)
      setTo(to2)
      setBed(anHotel.bed)

    }
  }, [dispatch, params.id, anHotel]);

  return (
    <div className='m-3'>
      {loading && <Loader/>}
      {error && <MessageDanger>{error} </MessageDanger>}
      <Row  className='rounded d-flex justify-content-center '>
        <Col sm={1} md={1} lg={1} xl={2} xxl={2}>
        </Col>
        <Col xs={10} sm={8} md={7} lg={6} xl={5} xxl={5} className='d-flex flex-column rounded p-3 justify-content-center mx-auto bg-secondary'>
            <h4 className='text-light mx-auto addHotel'>Add Hotel</h4>
            <Form variant='light' className='mx-3' onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasictitle">
                <Form.Label className='text-light'>Hotel Name</Form.Label>
                <Form.Control 
                  value={title} 
                  type="text" 
                  name = "title"
                  placeholder={title}
                  onChange={(e)=>setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicContent">
                <Form.Label className='text-light'>Content</Form.Label>
                <Form.Control 
                  value={content} 
                  as="textarea"
                  rows={3}
                  placeholder={content}
                  onChange={(e)=>setContent(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3 autocomplete" controlId="formBasicLocation">
              <Form.Label className='text-light'>Location</Form.Label>
                <Form.Control 
                  value={location} 
                  type="text" 
                  name = "location"
                  placeholder={location}
                  onChange={(e)=>setLocation(e.target.value)}
                /> 
              </Form.Group>




              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={imageHandler} accept='image/*' />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label className='text-light'>Price</Form.Label>
                <Form.Control 
                  value={price} 
                  type="number" 
                  placeholder={price}
                  onChange={(e)=>setPrice(e.target.value)}
                />
              </Form.Group>
              



              <Form.Group className="mb-3" controlId="formBasicFrom">
                <Form.Label className='text-light'>From</Form.Label>
                <DatePicker selected={from}
                  onChange={(date)=>setFrom(date)}
                  minDate={moment().toDate()}
                />
 
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTo">
                <Form.Label className='text-light'>To</Form.Label>
                <DatePicker selected={to}
                  onChange={(date)=>setTo(date)}
                  minDate={moment().toDate()}
                />
              </Form.Group>



              <Form.Group className="mb-3" controlId="formBasicBed">
                <Form.Label className='text-light'>Number of beds</Form.Label>
                <Form.Select aria-label="Default select example" value={bed}
                onChange={(e)=>setBed(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Form.Select>

              </Form.Group>
              <Button type='submit'>
                Save
              </Button>
            </Form>
          </Col>
          <Col xs={2} sm={2} md={3} lg={3} xl={3} xxl={3} >
            <img src={anHotel && anHotel._id? `/api/hotel/image/${anHotel._id}`:preview} 
            alt="preview_img" className='img img-fluid m-2' />
          </Col>
          <Col sm={1} md={6} lg={1} xl={2} xxl={2} className="pe-2">
          </Col>
        </Row> 
    </div>
  );
};

export default EditHotelScreen;

// src={`/api/hotel/image/${hotel._id}`}