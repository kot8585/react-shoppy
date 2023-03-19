import React from "react";

export default function NarBar() {
  return (
    <>
      <nav className="z-10">
        <ul className="flex flex-col min-w-200px fixed bg-white left-0 w-1/3 h-screen top-0 shadow-md">
          <li>셔츠/블라우스</li>
          <li>원피스</li>
          <li>아우터</li>
          <li>상의</li>
        </ul>
      </nav>
    </>
  );
}
