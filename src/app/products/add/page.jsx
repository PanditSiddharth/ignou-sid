"use server"

import { cookies } from 'next/headers';
import AddProductClient from './add';

import jwt from 'jsonwebtoken';

const AddProduct = async () => {
    const token = cookies().get("token")?.value;
    let cookie = null;
    if (token) {
        cookie = jwt.verify(token, process.env.JWT_TOKEN)
    }
    return (
        <AddProductClient login={cookie}  />
    )
}

export default AddProduct