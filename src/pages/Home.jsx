import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/';
import {filterProductsTitleThunk, getProductsThunk } from '../store/slices/productsAll.slice';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Card, InputGroup, Form, Row, Col, Button } from 'react-bootstrap';
import '../App.css'
import { setIsLoading } from '../store/slices/isLoading.slice';

const Home = () => {

    

    const dispatch = useDispatch()
    const seeProducts = useSelector(state => state.productsAll)

    useEffect(() => {
        dispatch(setIsLoading(true))
        dispatch(getProductsThunk())

         }, [dispatch])

         const navigate = useNavigate()
                 const [newsSearch, setNewsSearch] = useState('') 

    return (
       

            <Row className='principalRow'>
                

                <Col lg={9} className="colHome">

                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="What are you looking for?"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={newsSearch}
                            onChange={e => setNewsSearch(e.target.value)}
                        />
                        <Button className='bg-danger text-black' variant="outline-secondary" id="button-addon2" onClick={() => dispatch(filterProductsTitleThunk(newsSearch))}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                    </InputGroup>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {seeProducts?.map(product => (

                            //card

                            <Col className='productsInHome' aria-expanded="true"  key={product.id}>
                                <Card className='card' onClick={() => navigate(`/product/${product.id}`)}  >
                                    <Card.Img className='imgCard' variant="top"  src={product.foto} />
                                    <Card.Body className='cardHome'  >
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Title>{product.author}</Card.Title>
                                        <Card.Title>{product.publicationYear}</Card.Title>

                                        <Card.Text className='nav1'> <span className='sp1'>Price:</span>  {product.price}   </Card.Text> 

                                    </Card.Body>
                                    <button className='cartButton'><i className="fa-solid fa-book"></i></button>
                                </Card>
                            </Col>
                        ))}
                    </Row>





                </Col>

                
            </Row>
             

            
        
    );
};

export default Home; 