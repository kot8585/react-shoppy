import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  product: { id, imageUrl, name, category, price },
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products/${id}`, { state: product });
  };

  return (
    <li
      className="rounded-md hover:scale-105 ease-out duration-300 shadow-lg flex flex-col"
      role="button"
      key={id}
      onClick={handleClick}
    >
      <img className="w-full h-4/5 xl:h-5/6" src={imageUrl} alt="상품 사진" />
      <div className="flex justify-between p-2 h-5/1 my-auto">
        <div className="flex flex-col">
          <span>{name}</span>
          <span className="text-zinc-400 text-sm">{category}</span>
        </div>
        <span>{`₩${price}`}</span>
      </div>
    </li>
  );
}
