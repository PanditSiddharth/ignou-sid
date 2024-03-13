import NavebarClient from "./navclient";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const Navebar = () => {
  const token = cookies().get("token")?.value;
  let cookie = null;
  if(token){
  cookie = jwt.verify(token, process.env.JWT_TOKEN)
  }
  return (
    <NavebarClient cookie={cookie} />
  )
}

export default Navebar