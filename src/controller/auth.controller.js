import jwt from "jsonwebtoken";

import User from "../model/User.model.js";

export const register = async (req, res) => {
  const { body } = req;

  if (body.type === "admin") res.send(401);

  try {
    const user = await User.create({
      ...body,
      authorized: body.type === "user",
    });
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (user) {
    if (!user.authorized) {
      return res
        .status(401)
        .send({ message: "User not authorized, contact support" });
    }
    const token = jwt.sign(
      { username, type: user.type },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.send({ user, token });
  }

  return res.status(404).json({ message: "User Not found" });
};

export const verifyToken = async (req, res) => {
  const token = req.cookies.jwt || req.headers["token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ username: decoded.username });
    if (!user.authorized) return res.status(401);

    req.user = user;

    return res.send(user);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};
