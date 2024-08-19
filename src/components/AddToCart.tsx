'use client';

import React, { useContext, useState } from 'react';
import { AppContext } from '@/app/Context/CartContext';

const AddToCart = ({ product_id, user_id }: { product_id: string, user_id: string }) => {
  const { setCart, addToCart } = useContext(AppContext);
  const [num, setNum] = useState(1);

  const handleAddToCart = async (e: any) => {
    e.preventDefault();

    addToCart({ productId: product_id, quantity: num });
    setCart((prevTotal: number) => prevTotal + num);

    try {
      const res = await fetch("/api/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product_id,
          quantity: num,
          user_id: user_id
        }),
      });
      // setSuccessMessage("Product Added Successfully")
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <div className='flex gap-x-6'>
      <div className="flex items-center gap-x-2">
        <button
          className="border rounded-full h-8 w-8 text-center bg-slate-200 text-2xl"
          onClick={() => {
            setNum(num <= 1 ? 1 : num - 1);
          }}
        >
          -
        </button>
        <span>{num}</span>
        <button
          className="border rounded-full h-8 w-8 text-center bg-slate-200 text-xl"
          onClick={() => {
            setNum(num + 1);
          }}
        >
          +
        </button>
      </div>
      <div className='w-fit shadow-xl'>
        <button className='bg-blue-300 px-4 py-2' onClick={handleAddToCart}>Add To Cart</button>
      </div>
    </div>
  );
};

export default AddToCart;