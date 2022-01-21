import React from 'react'
import { Navbar, Container, NavDropdown, Nav} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {

  const dispatch = useDispatch()
  const userRegisterReducer = useSelector(state => state.userRegisterReducer)
  const {user} = userRegisterReducer

  
  return (
    <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect >
      <Container>
          <LinkContainer to={'/'}>
            <Navbar.Brand>  
              <span className="material-icons" style={{position: 'relative', top: '4px' }}>
                home
              </span>
              <span>
                Home
              </span> 
            </Navbar.Brand>
          </LinkContainer>
          {
            user && 
            (
            <LinkContainer to={'/dashboard'} >
              <Navbar.Brand>
                Dashbord
              </Navbar.Brand>
            </LinkContainer>
            )
          }
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            <Nav>
              {
                !user? (
                  <>
                  <LinkContainer to='/login'>
                    <Nav.Link className='' >Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link className=''>Register</Nav.Link> 
                  </LinkContainer>
                  </>
                ): (
                  <>
                    <Nav.Link onClick={()=>dispatch(logout())} >Logout</Nav.Link>
                    <NavDropdown title={user.name} id="basic-nav-dropdown">
                      <NavDropdown.Item >Action</NavDropdown.Item>
                      <NavDropdown.Item >Another action</NavDropdown.Item>
                      <NavDropdown.Item >Something</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>Separated link</NavDropdown.Item>
                    </NavDropdown>
                  </>
                )
              }
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar> 
  )
}

export default Header
