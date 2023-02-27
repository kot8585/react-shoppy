import React, { useState } from 'react';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';

export default function CartCard({cart: {id, imageUrl, name, category, price, size, count}, addTotalPrice, subTotalPrice}) {
  const [countState, setCountState] = useState(count);

  const onAdd = () => {
    setCountState(countState + 1);
    addTotalPrice(parseInt(price));
  }

  const onSub = () => {
    if(countState <= 0){
      return;
    }
    setCountState(countState-1);
    subTotalPrice(parseInt(price));
  }

  return (
    <li className='flex gap-3 items-center py-3' key={id}>
      <img src={imageUrl} alt={name} className='h-32'/>
      <div className='flex flex-col flex-grow'>
        <p>{name}</p>
        <p className='text-main'>{size}</p>
        <p className='text-sm'>₩{price}</p>
      </div>
      <div className='flex items-center gap-1'>
        <AiOutlinePlusSquare onClick={onAdd}/>
        <span>{countState}</span>
        <AiOutlineMinusSquare onClick={onSub}/>
        <FaTrashAlt className='ml-1 hover:text-main text-sm'/>
      </div>
    </li>
  );
}

