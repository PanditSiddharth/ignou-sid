import React from 'react'
import SellersClient from './seclient'
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const SellersServer = () => {
  
  const token = cookies().get('token')?.value;
  let gbl; 

  if (token) {
    let decoded = jwt.verify(token, process.env.JWT_TOKEN)
    gbl = JSON.parse(JSON.stringify(decoded))
  }
  return (
    <SellersClient gbl={gbl} />
  )
}

export default SellersServer