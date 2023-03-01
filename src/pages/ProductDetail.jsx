import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import useCart from '../hooks/useCart';

export default function ProductDetail() {
  const { addOrUpdateItem } = useCart();
  const {
    state: { id, name, description, category, imageUrl, option, price },
  } = useLocation();
  const { user } = useUserContext();

  const [selected, setSelected] = useState(option && option[0]);
  const [completed, setCompleted] = useState(false);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const handleClick = async () => {
    //product만들기
    if (!user) {
      alert('장바구니는 로그인을 해야 이용가능해요');
      return;
    }
    const product = {
      id,
      name,
      description,
      category,
      imageUrl,
      size: selected,
      price,
      count: 1,
    };
    //장바구니에 추가하기
    addOrUpdateItem.mutate(product);
    alert('장바구니에 추가되었어요');
    setCompleted(true);
    setTimeout(() => {
      setCompleted(false);
    }, '3000');
  };

  return (
    <div className="px-7 py-5">
      <p>{category}</p>
      <section className="flex justify-center gap-5 mt-2">
        <img src={imageUrl} alt="상품 사진" className="w-1/2" />
        <div className="flex flex-col w-1/2">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-xl border-b-2 border-grey py-1">₩{price}</p>

          <p className="py-2">{description}</p>
          <div className="flex items-center my-3">
            <label htmlFor="select" className="text-main">
              옵션 :
            </label>
            <select
              onChange={handleChange}
              value={selected}
              className="grow border-dashed border-2 border-main ml-3 p-1"
            >
              {option &&
                option.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
          <span className={completed ? 'visible' : 'hidden'}>
            ✅ 장바구니에 추가되었어요
          </span>
          <button className="bg-main text-white p-1" onClick={handleClick}>
            장바구니에 추가
          </button>
        </div>
      </section>
    </div>
  );
}
