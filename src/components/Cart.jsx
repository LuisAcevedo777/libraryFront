import { Offcanvas,Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css'
import { deleteThunk, getCartThunk,updateThunk } from '../store/slices/cart.slice';
import { loadStripe } from '@stripe/stripe-js';


const Cart = ({show,handleClose}) => {

    const dispatch= useDispatch()

    const [stripe, setStripe] = useState(null);

    useEffect(() => {
      const initializeStripe = async () => {
        const stripeInstance = await loadStripe("pk_test_51Q6T2CRpc8bbsTVvFKN1iWX6Ejm3ZU6uquCqzuHFgMImCWCYLoCpZWZXlfUhuZ2EYaxF4PbAC6NnybXjg5ZCFYHF00UO05adDl");
        setStripe(stripeInstance);
      };
  
      initializeStripe();
    }, []);

      const [priceTotal, setPriceTotal]=useState(0)
      const [quantityTotal, setQuantityTotal]=useState(0)
    
      const carts = useSelector(state=> state.cart)

    useEffect(()=>{

        dispatch(getCartThunk())
        

    },[dispatch])
  
   
    useEffect(() => {
     
      const totalQuantity = carts.reduce((acc, book) => acc + book.quantity, 0);
      const totalPrice = carts.reduce((acc, book) => acc + (book.price * book.quantity), 0);

      setQuantityTotal(totalQuantity);
      setPriceTotal(totalPrice);
  }, [carts]);



  const plus = (book) => {
    const updatedBook = { ...book, quantity: book.quantity + 1 };
    dispatch(updateThunk(updatedBook));
};

const minus = (book) => {
    if (book.quantity > 0) {
        const updatedBook = { ...book, quantity: book.quantity - 1 };
        dispatch(updateThunk(updatedBook));
    }
};
  
    const dele = (id)=>{

      dispatch(deleteThunk(id))
      setQuantityTotal(0)
      setPriceTotal(0)
    }


  const handleCheckout = async () => {
    if (!stripe) {
      console.error("Stripe is not initialized.");
      return;
    }

    const response = await fetch("librarynode-production.up.railway.app/api/session/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: priceTotal * 100 , quantity: quantityTotal}),
    });

    const sessionId = await response.json();

    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId.id,
    });

    if (error) {
      console.error("Error redirecting to checkout:", error);
    }
  };



    return (
        <div>
             <Offcanvas placement='end' show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
       <ul>
{carts?.map(cart=>(

           <li className='cardCart' key={cart.id}>

            <img className='imgCart' src={cart.foto} alt="" />
            <div className='titButtons'>
              <h1 className='titleCart'>{cart.title}</h1>
              <div className='pricValue1'>
                   <div className='buttonDesc'>
                   <button className='count' onClick={()=>minus(cart)}>-</button>
                   <div className='count'>{(cart.quantity)}</div>
                   <button className='count' onClick={()=>plus(cart)}>+</button></div>
                   </div></div>
                   <div className='imgPricCart'>
                   <img src='' alt="" />
                   <div className='garh2'>
                   <h2 className='pricpric1'><span className='priceD1'>Price:</span>{(cart.price)*(cart.quantity)} </h2>
                    <i onClick={()=>dele(cart.id)} className="fa-solid fa-trash-can garbage"></i></div>
                   </div>
           </li>

))}


       </ul>

<Button onClick={handleCheckout}>CheckOut</Button>
        </Offcanvas.Body>
        <h2>quantity</h2>
        <span>{quantityTotal}</span>
        <h2>price</h2>
<span>{priceTotal}</span>
      </Offcanvas>
        </div>
    );
};

export default Cart;