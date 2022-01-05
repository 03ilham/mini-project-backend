const findAll = async (req, res) => {
  const result = await req.context.models.address.findAll({
    include: [
      {
        all: true,
      },
    ],
  });
  return res.send(result);
};

const findOneAddress = async (req, res) => {
  const result = await req.context.models.address.findOne({
    include: [
      {
        all: true,
      },
    ],
    where: { addr_user_id: req.params.id },
  });
  return res.send(result);
};

const createAddres = async (req, res, next) => {
  const files = req.files;
  const userId = req.userId;

  try {
    const result = await req.context.models.address.create({
      addr_user_id: userId,
      addr_name: files.addressName,
      addr_detail: files.addressDetail,
      addr_latitude: files.addressLatitude,
      addr_longitude: files.addressLongitude,
    });

    const {
      username,
      email,
      roleType,
      addressName,
      addressDetail,
      addressLatitude,
      addressLongitude,
    } = files;
    res.json({
      profile: { username, email, roleType },
      address: {
        addressName,
        addressDetail,
        addressLatitude,
        addressLongitude,
      },
      success: true,
    });
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const updateAdress = async (req, res) => {
  const { addr_name, addr_detail, addr_latitude, addr_longitude } = req.body;

  try {
    const result = await req.context.models.address.update(
      {
        addr_name: addr_name,
        addr_detail: addr_detail,
        addr_latitude: addr_latitude,
        addr_longitude: addr_longitude,
      },
      {
        returning: true,
        where: { addr_user_id: req.params.id },
      }
    );
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const deleteAddress = async (req, res) => {
  const id = req.params.id;

  await req.context.models.address
    .destroy({
      where: { addr_id: id },
    })
    .then((result) => {
      return res.send(`Delete ${result} address`);
    })
    .catch((error) => {
      return res.sendStatus(404).send(error);
    });
};

const createRow = async (req, res) => {
  const { addr_name, addr_detail, addr_latitude, addr_longitude } = req.body;
  const id = req.params.id;
  try {
    const result = await req.context.models.address.create({
      addr_name: addr_name,
      addr_detail: addr_detail,
      addr_latitude: addr_latitude,
      addr_longitude: addr_longitude,
      addr_user_id: id,
    });
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const create = async (req, res) => {
  const user = req.user;
  try {
    const result = await req.context.models.address.create({
      addr_user_id: user.user_id,
    });
    const { user_name, user_email } = user;
    res.send({ user_name, user_email });
  } catch (error) {
    return res.send(error);
  }
};

export default {
  createAddres,
  updateAdress,
  findAll,
  deleteAddress,
  findOneAddress,
  createRow,
  create,
};
