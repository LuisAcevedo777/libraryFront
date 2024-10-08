import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  filterProductThunk,
  getProductsThunk,
  } from "../store/slices/productsAll.slice";
import { Row, Col, Carousel } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import { addCartThunk, updateThunk } from "../store/slices/cart.slice";
import "../App.css";
import productsSuggested from "../../book.json";


const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(filterProductThunk(id));
  }, [id]);

  const [count, setCount] = useState(0);

  const uniqueProduct = useSelector((state) => state.productsAll);
  const [pric, setPric] = useState(0);

  const navigate = useNavigate();

  const addToCart = (book) => {
    const body ={
      "author": book.author,
      "foto": book.foto,
      "id": book.id,
      "price": book.price,
      "publicationYear": book.publicationYear,
      "quantity": count,
      "title": book.title,
        }
    dispatch(addCartThunk(body));
  };
  const plus = (book) => {
    setCount(count + 1);
    setPric(uniqueProduct.price * (count + 1));
   
    const body ={
      "author": book.author,
      "foto": book.foto,
      "id": book.id,
      "price": book.price,
      "publicationYear": book.publicationYear,
      "quantity": count,
      "title": book.title,
        }
    dispatch(updateThunk(body))
  };
  const minus = (book) => {
    if (count < 1) {
      setCount(0);
    } else {
      setCount(count - 1);
      setPric(pric - uniqueProduct.price);
    }
   
     
    const body ={
      "author": book.author,
      "foto": book.foto,
      "id": book.id,
      "price": book.price,
      "publicationYear": book.publicationYear,
      "quantity": count === 0 ? 0 : count-1,
      "title": book.title,
        }
    dispatch(updateThunk(body))

  };

  const addLoan= (body)=>{
  const id = JSON.parse(localStorage.getItem('id'))

  const now = new Date();
const day = String(now.getDate()).padStart(2, '0'); 
const month = String(now.getMonth() + 1).padStart(2, '0'); 
const year = now.getFullYear(); 


  const newBody ={

    "userId": id,
    "bookId": body.id,
    "loanDate":  `${day}/${month}/${year}`,
    "returnDate": `${now.getDate()+8}/${month}/${year}`
  }
   axios.post(`https://librarynode-production.up.railway.app/api/loans/${id}/${body.id}`,newBody)
   .then((res)=>{
    const loans = JSON.parse(localStorage.getItem("loans"))
    if(loans){
    loans.push(body)
    localStorage.setItem('loans', JSON.stringify(loans))
    console.log('listo puchado')}
    else{localStorage.setItem('loans',JSON.stringify([]))}
   })

  }



  return (
    <div className="divProductDetail">
      <Row className="containerPrincipal" aria-expanded="true">
      <div className="linktotit">
              <Link className="linkHome" to={"/"}>
                <i className="fa-solid fa-house"></i>
              </Link>{" "}
            </div>
        <Col lg={7}>
          <div className="col1">
            
            
              <img
                className="imgUnique"
                src={uniqueProduct.foto}
                alt="First slide"
              />
            

            <p className="priceD">Price: {uniqueProduct.price}</p>
          </div>
        </Col>
        <Col lg={5} className="descriptionTot">
        <div className="pricValue">
            <h2>DESCRIPTION:</h2>
            <p>{uniqueProduct.title}</p>
            <p>{uniqueProduct.author}</p>
            
              <h2 className="pricpric">
                <span className="priceD">Price:</span>
                {uniqueProduct.price * count}{" "}
              </h2>
              <div className="buttonDesc">
                <button className="count" onClick={()=>minus(uniqueProduct)}>
                  
                </button>
                <div className="count">{count}</div>
                <button
                  className="count"
                  onClick={() => plus(uniqueProduct)}
                >
                  +
                </button>
              </div>
            </div>
            <button onClick={()=>addToCart(uniqueProduct)} className="addToCart">
              Add to Cart
            </button>

            <button onClick={()=>addLoan(uniqueProduct)} className="addToCart">
              Loan 
            </button>
          
        </Col>
      </Row>

      <Carousel className="ulistSuggered">
        {productsSuggested.libros?.map((productSuggested) => (
          <Carousel.Item
            className="listSuggered"
            key={productSuggested.id}
            onClick={() => navigate(`/product/${productSuggested.id}`)}
          >
            <img className="imgSuggered" src={productSuggested.foto} alt="" />
            <p className="titleSuggered">{productSuggested.title}</p>
            <p className="titleSuggered">{productSuggested.publicationYear}</p>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetail;
