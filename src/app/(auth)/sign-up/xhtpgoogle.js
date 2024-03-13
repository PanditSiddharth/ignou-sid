"use server"

const XhtpAuthGoogle = async (e) => {
  try{
  const { otp, xhtp } = e;
  let xhtpp = String((+xhtp - 123456789)/123456789).padStart(6, '0')
  console.log("first", xhtp, otp)
  if( xhtpp.trim() == otp.trim())
  return true
  return false
} catch (err) {
  return false
}
}

export default XhtpAuthGoogle;