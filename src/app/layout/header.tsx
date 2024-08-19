'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { AppContext } from '../Context/CartContext';
import { Search, ShoppingCart } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

const Header = () => {
  const { data: session }: any = useSession();
  const { cart, setCart } = useContext(AppContext);

  return (
    <div className="flex items-center py-8 lg:py-8 px-10">
      <ul className="hidden lg:flex items-center justify-end gap-x-8 flex-auto">
        <Link href="/"><li>Home</li></Link>
        {!session ? (
          <>
            <Link href="/login"><li>Login</li></Link>
            <Link href="/register"><li>Register</li></Link>
          </>
        ) : (
          <>
            <Link href="/dashboard"><li>Dashboard</li></Link>
            <li><button onClick={() => {
              signOut();
            }}
              className=''
            >Log Out
            </button>
            </li>
          </>
        )}
        <Link href="/cart">
          <div className='flex'>
            <ShoppingCart />
            <span className='-mt-3'>{cart}</span>
          </div>
        </Link>
        <Link href={"/search"}>
          <Search />
        </Link>
      </ul>
    </div>
  )
}

export default Header