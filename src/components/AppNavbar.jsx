import React, { useState } from 'react';
import {Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import Cart from './Cart'



const AppNavbar = () => {


    
    const navigate = useNavigate()


    const logout=()=>{

  localStorage.setItem('token', '')

navigate('/Login')

    }
    const tok = localStorage.getItem('token')
    const [show, setShow] = useState(false);
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div>
            
            <Navbar className='pnav  fixed-top bg-dark' expand="md">
         
               
           
                <Navbar.Brand as={Link} to='/' className='nav1 text-light' >District Library</Navbar.Brand>
                <div className='nav d-flex justify-content-end fixed-top '>
         <div className='nav2'>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className='bg-dark'>
                        <Nav className="me-auto bg-dark">
                            <Nav.Link as={Link} to="/Login" className='l1 bg-dark'><i className="fa-solid fa-user fa-3x"></i></Nav.Link>
                            <Nav.Link as={Link} to="/Purchases" className='l1 text-black'><i className="fa-solid fa-box-archive fa-3x"></i></Nav.Link>
                            <Nav.Link className='l1 text-black' onClick={tok !== '' &&( handleShow) }><i className="fa-solid fa-cart-shopping fa-3x"></i></Nav.Link>
                            <Nav.Link className='l1-logout text-danger' onClick={logout} >LogOut</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                    </div></div>
            </Navbar>
           <Cart show={show} handleClose={handleClose} />

        </div>
    );
};

export default AppNavbar;