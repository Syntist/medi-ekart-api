import User from "../model/User.model.js";

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  if (users) return res.send(users);

  return res.status(400).send({ message: "No User Found" });
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
