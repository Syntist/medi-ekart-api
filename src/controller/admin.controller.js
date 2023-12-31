import User from "../model/User.model.js";

export const getUsersAdmin = async (req, res) => {
  const users = await User.find().select("-password");
  if (users) return res.send(users);

  return res.status(400).send({ message: "No Users Found" });
};

export const authorized = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });

  if (!user) return res.sendStatus(404);

  const update = await User.updateOne(
    { username },
    {
      authorized: true,
    },
  );

  return res.send(update);
};

export const unauthorized = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });

  if (!user) return res.sendStatus(404);

  const update = await User.updateOne(
    { username },
    {
      authorized: false,
    },
  );

  return res.send(update);
};
