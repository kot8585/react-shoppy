import React from 'react';

export default function Button({ text, onClick }) {
  return (
    <button 
      className='bg-main text-white text-lg px-2 py-1'
      onClick={onClick}>
      {text}
    </button>
  );
}

