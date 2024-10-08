import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css'
import {Link} from 'react-router-dom'

const Purchases = () => {

    const dispatch = useDispatch()
    const purchases= JSON.parse(localStorage.getItem('loans'))

0

    return (
        <div className='purchasesContainer'>
            <div className='linktotit1'><Link className='linkHome' to={'/'}><i className="fa-solid fa-house"></i></Link><h2>MY LOAN</h2></div>
            {purchases?.map(purch=> (
    <ul className='ulCardPurchase' key={purch.id}>
<li className='liCardPurchase' > <Link className='linkCardPurchase' to={`/product/${purch.id}`}>
   
<div className='divImgPurchases'><img className='imgPurchases' src={purch.foto} alt="" /></div>
    <h1 className='titPurchases'>{purch.title}</h1> 
    <p className='pricePurchases'>{purch.loanDate}</p>
    <p className='pricePurchases'>{purch.returnDate}</p>
     <p className='pricePurchases'>${purch.price}</p>
     </Link>
</li>
</ul>
))}
 </div>
    );
};

export default Purchases;