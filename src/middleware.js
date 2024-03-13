
import { NextResponse } from 'next/server'
// import jwt from "jsonwebtoken"
import * as jwt from "jose"

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const path = request.nextUrl.pathname;
    
    let privatePath = (/\s*\/(profile.*|products\/add.*)/i).test(path)
    let publicPath = (/\s*\/(sign-in|sign-up|apimail)/i).test(path)
    
    const token = request.cookies.get('token')?.value || "";
    
    if (privatePath && !token) {
        return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
    }

    if(publicPath && token){
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    if(!token)
        return;
    
    const decoded = (await jwt.jwtVerify(token, new TextEncoder().encode(process.env.JWT_TOKEN))).payload
   
    // const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    if(privatePath){
        const seller = (/\s*\/(products\/add.*)/i).test(path)
        if(seller && !decoded.sellerid){
            return NextResponse.redirect(new URL("/students/" + decoded.studentid, request.nextUrl));
        } else if(!seller && decoded.sellerid){
            return NextResponse.redirect(new URL("/sellers/" + decoded.sellerid, request.nextUrl));
        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', 
    '/profile/:path*', 
    '/sign-in', 
    '/sign-up', 
    '/apimail',
    '/products/add/:path*'
]
}