import React from 'react';
import PriceCard from '../components/PriceCard';
import CartItem from '../components/CartItem';
import useCart from '../hooks/useCart';

const shipPrice = 3000;

export default function Cart() {
  const {
    getCart: { isLoading, error, data: carts },
  } = useCart();

  if (isLoading) return <>Loading...</>;
  if (error) return <>{error}</>;

  const hasCarts = carts && carts.length > 0;

  const totalPrice =
    carts &&
    carts.reduce((prev, curr) => prev + parseInt(curr.price) * curr.count, 0);
  return (
    <>
      <section className="flex flex-col items-center w-full pb-3 ">
        <h1 className="text-lg font-bold border-gray-200 border-b w-full text-center pb-2">
          내 장바구니
        </h1>
        <ul className="w-full">
          {!hasCarts && <p className='p-3 text-center'>장바구니에 상품이 없어요</p>}
          {hasCarts &&
            carts.map((cart) => <CartItem key={cart.id} cart={cart} />)}
        </ul>
        <div className="flex justify-around w-full text-center">
          <PriceCard text="상품 총액" price={totalPrice} />
          <span>+</span>
          <PriceCard text="배송액" price={shipPrice} />
          <span>=</span>
          <PriceCard text="총가격" price={totalPrice + shipPrice} />
        </div>
      </section>
    </>
  );
}
