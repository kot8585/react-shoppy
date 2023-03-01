import React from "react";

export default function PriceCard({ text, price }) {
  return (
    <div>
      <p>{text}</p>
      <p>₩{price}</p>
    </div>
  );
}
