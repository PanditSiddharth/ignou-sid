import React from 'react'
import CategoriesClient from './stclient'
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const CategoriesServer = () => {
  
  const token = cookies().get('token')?.value;
  let gbl; 

  if (token) {
    let decoded = jwt.verify(token, process.env.JWT_TOKEN)
    gbl = JSON.parse(JSON.stringify(decoded))
  }
  return (
    <CategoriesClient gbl={gbl} />
  )
}

export default CategoriesServer