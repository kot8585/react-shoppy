import React from 'react';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import useCart from '../hooks/useCart';

export default function CartCard({
  cart,
  cart: { id, imageUrl, name, category, price, size, count },
}) {
  const { addOrUpdateItem, removeItem } = useCart();
  const onAdd = () => {
    addOrUpdateItem.mutate({ ...cart, count: count + 1 });
  };

  const onSub = () => {
    if (count <= 0) {
      return;
    }
    addOrUpdateItem.mutate({ ...cart, count: count - 1 });
  };

  const handleDelete = () => {
    removeItem.mutate(id);
  };

  return (
    <li className="flex gap-3 items-center py-3" key={id}>
      <img src={imageUrl} alt={name} className="h-32 w-28" />
      <div className="flex flex-col flex-grow">
        <p>{name}</p>
        <p className="text-main">{size}</p>
        <p className="text-sm">₩{price}</p>
      </div>
      <div className="flex items-center gap-1">
        <AiOutlinePlusSquare onClick={onAdd} />
        <span>{count}</span>
        <AiOutlineMinusSquare onClick={onSub} />
        <FaTrashAlt
          className="ml-1 hover:text-main text-sm"
          onClick={handleDelete}
        />
      </div>
    </li>
  );
}
