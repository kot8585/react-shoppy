import React from 'react';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { addCart, removeFromCart } from '../api/database';

export default function CartCard({
  uid,
  cart,
  cart: {id, imageUrl, name, category, price, size, count}
}) {

  const onAdd = () => {
    addCart({...cart, count: count+1}, uid);
  }

  const onSub = () => {
    if(count <= 0){
      return;
    }
    addCart({...cart, count: count-1}, uid);
  }

  const handleDelete = () => {
    removeFromCart(uid, id);
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
        <span>{count}</span>
        <AiOutlineMinusSquare onClick={onSub}/>
        <FaTrashAlt 
          className='ml-1 hover:text-main text-sm'
          onClick={handleDelete}
          />
      </div>
    </li>
  );
}

