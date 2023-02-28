import React, { useState } from 'react';
import { getCart } from '../api/database';
import { useUserContext } from '../context/UserContext';
import { useQuery } from '@tanstack/react-query';
// import CartCard from '../components/CartCard';
import PriceCard from '../components/PriceCard';
import CartCard from '../components/CartCard';

const shipPrice = 3000;

export default function Cart() {  
  const {user} = useUserContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const addTotalPrice = (price) => {
    setTotalPrice(totalPrice + price);
  }
  const subTotalPrice = (price) => {
    setTotalPrice(totalPrice - price);
  }

  const {isLoading, error, data: carts} = useQuery(
    ['carts', user ? user.uid : ''], 
    async () => {
      const carts = await getCart(user.uid);
      let totalPrice;
      if(!carts || carts.length === 0) return [];
      totalPrice = carts.reduce((prev, curr) =>  prev + parseInt(curr.price), 0);
      setTotalPrice(totalPrice);
      return carts;
     }) 

  return (
    <>
      {isLoading && <>Loading...</>}
      {error && <>{error}</>}
      <section className='flex flex-col items-center w-full pb-3 '>
        <h1 className='text-lg font-bold border-gray-200 border-b w-full text-center pb-2'>내 장바구니</h1>
        <ul className='w-full'>
          {carts && carts.length> 0 && carts.map((cart) => 
            <CartCard
              key={cart.id} 
              cart={cart} 
              addTotalPrice={addTotalPrice} 
              subTotalPrice={subTotalPrice}
              />
          )}
        </ul>
        <div className='flex justify-around w-full text-center'>
          <PriceCard text='상품 총액' price={totalPrice} />
          <span>+</span>
          <PriceCard text='배송액' price={shipPrice} />
          <span>=</span>
          <PriceCard text='총가격' price={totalPrice + shipPrice} />
        </div>
      </section>
    </>
  );
}
