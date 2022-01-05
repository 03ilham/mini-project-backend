import bcrypt from "bcrypt";
import AddAdress from "../helpers/AddAdress";
import CreateBedrooms from "../helpers/CreateBedrooms";
const SALT_ROUND = 10;

const findAllRows = async (req, res) => {
  const id = req.params.id
  const result = await req.context.models.users.findOne({
    include:[{
      all: true
    }],
    where: {user_id: id}
  });
  return res.send(result);
};

const signup = async (req, res, next) => {
  const { username, email, user_password, user_handphone, user_roles } =
    req.body;

  let hashPassword = user_password;
  hashPassword = await bcrypt.hash(hashPassword, SALT_ROUND);
  try {
    const result = await req.context.models.users.create({
      user_name: username,
      user_email: email,
      user_password: hashPassword,
      user_handphone: user_handphone,
      user_roles: user_roles,
    });

    // const { user_name, user_email } = result.dataValues;
    // res.send({ user_name, user_email });
    req.user = result.dataValues
    next()
  } catch (error) {
    res.sendStatus(404).send(error);
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await req.context.models.users.findOne({
      where: { user_email: email },
    });
    const { user_name, user_email, user_password } = result.dataValues;
    const compare = await bcrypt.compare(password, user_password);
    if (compare) {
      return res.send({ user_name, user_email });
    } else {
      return res.sendStatus(404).send(error);
    }
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const updateUser = async (req, res) => {
  const { user_password } = req.body;

  const hasPasword = await bcrypt.hash(user_password, SALT_ROUND);

  try {
    const result = await req.context.models.users.update(
      {
        user_password: hasPasword,
      },
      { returning: true, where: { user_id: req.params.id } }
    );
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const updateOneUsers = async (req, res) => {
  const id = req.params.id;
  const { username, email, user_handphone, user_roles } = req.body;
  try {
    const result = await req.context.models.users.update(
      {
        user_name: username,
        user_email: email,
        user_handphone: user_handphone,
        user_roles: user_roles,
      },
      { returning: true, where: { user_id: id } }
    );
    return res.send(result);
  } catch (error) {
    return error;
  }
};

const deleteUsers = async (req, res) => {
  const id = req.params.id;

  await req.context.models.users
    .destroy({
      where: { user_id: id },
    })
    .then((result) => {
      return res.send(`Delete ${result} users`);
    })
    .catch((error) => {
      return res.sendStatus(404).send(error);
    });
};

const daftarAccount = async (req, res, next) => {
  try {
    const daftar = await AddAdress.addAdres(req);
    const {
      fields,
      files,
      status: { status },
    } = daftar;

    try {
      const hashPassword = await bcrypt.hash(fields.password, SALT_ROUND);
      const result = await req.context.models.users.create({
        user_name: fields.username,
        user_email: fields.email,
        user_password: hashPassword,
        user_handphone: fields.handphone,
        user_roles: fields.roles,
      });

      req.userId = result.dataValues.user_id;
      req.files = files;
      next();
    } catch (error) {
      return res.sendStatus(404).send(error);
    }
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

export default {
  findAllRows,
  signup,
  signin,
  updateUser,
  deleteUsers,
  daftarAccount,
  updateOneUsers,
};
