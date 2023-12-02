import jwt from "jsonwebtoken";

import User from "../model/User.model.js";

export const register = async (req, res) => {
  const { body } = req;

  if (body.type === "admin") res.send(401);

  let accessible = false;
  if (body.type === "user") accessible = true;

  try {
    const user = await User.create({ ...body, accessible });
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (user) {
    if (!user.accessible) {
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
    return res.send({ id: user.id, token });
  }

  return res.status(404).json({ message: "User Not found" });
};
