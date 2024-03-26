"use server"
import jwt from "jsonwebtoken";
import SellerClient from "./product";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import connect from "@/connect"
import PageNotFound from "@/components/pagenotfound";
import Product from "@/modals/products";

const ProductServer = async (req) => {
  const token = cookies().get('token')?.value;
  let decoded;
  if (token) {
    decoded = jwt.verify(token, process.env.JWT_TOKEN);
  }

  if (mongoose.connection?.readyState !== 1) {
    console.log("connecting...")
    await connect();
  }

  let product;
  const productid = req.params?.product;
  if (productid) {
    product = await Product.findOne({ productid });
  }

  return (product?.name ? <SellerClient login={JSON.parse(JSON.stringify(decoded))} product={{productid: product?.productid, name: product?.name, sellerid: product?.sellerid, price: product?.price, thumbnail: product?.thumbnail, description: product?.description }} /> : <PageNotFound />)
};

export default ProductServer; 