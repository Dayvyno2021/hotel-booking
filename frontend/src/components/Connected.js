import React from 'react'
import {Container, Row, Button, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Connected = () => {
  return (
    <Container fluid className='p-3'>
      <Row>
        <Col md={10}>
          <h2>Your Hotels</h2>
        </Col>
        <Col md={2}>
          <Link to={'/hotels/new'}>
            <Button>
              + Add New
            </Button>
          </Link>
        </Col>
      </Row>  
    </Container>
  )
}

export default Connected