import jwt from "jsonwebtoken";

export const requiredAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    // eslint-disable-next-line consistent-return
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401);
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401);
  }
};
