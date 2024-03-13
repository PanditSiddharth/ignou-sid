"use server"

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import MainClient from './mainClient';

const Home = async () => {
    const token = cookies().get("token")?.value;
    let cookie = null;
    if (token) {
        cookie = jwt.verify(token, process.env.JWT_TOKEN)
    }
    return (
        <MainClient login={cookie} />
    )
}

export default Home