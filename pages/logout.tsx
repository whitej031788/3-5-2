import { signOut } from 'next-auth/client';
import React, { useEffect } from 'react';

export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: '/login' })
  }, []);
  
  return (<></>)
}