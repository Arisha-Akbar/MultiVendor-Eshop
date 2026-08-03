const sendShopToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  const options = {
    maxAge: 90 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "PRODUCTION" ? "none" : "lax",
    secure: process.env.NODE_ENV === "PRODUCTION",
  };

  res.status(statusCode).cookie("seller_token", token, options).json({
    success: true,
    user,
    token,
  });
};

export default sendShopToken;
