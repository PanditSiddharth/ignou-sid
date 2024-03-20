import React from 'react'
import StudentsClient from './stclient'
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const StudentsServer = () => {
  
  const token = cookies().get('token')?.value;
  let gbl; 

  if (token) {
    let decoded = jwt.verify(token, process.env.JWT_TOKEN)
    gbl = JSON.parse(JSON.stringify(decoded))
  }
  return (
    <StudentsClient gbl={gbl} />
  )
}

export default StudentsServer