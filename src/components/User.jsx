import React from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function User({ user: { isAdmin, photoURL, displayName } }) {
  return (
    <>
      {isAdmin && (
        <Link to="products/new">
          <BsFillPencilFill className="ml-2" />
        </Link>
      )}
      <div className="flex items-center shrink-0">
        <img
          className="w-7 h-7 rounded-full"
          src={photoURL}
          alt="프로필 이미지"
          referrerPolicy="no-referrer"
        />
        <span className="text-sm ml-1 hidden sm:inline-block">
          {displayName}
        </span>
      </div>
    </>
  );
}
