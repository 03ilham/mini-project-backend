const findAllRows = async (req, res) => {
  const result = await req.context.models.houses_reverse.findOne({
    include: [{
      all: true
    }],
    where: {hove_user_id: req.params.id, hove_status: 'open'}
  })
  return res.send(result);
};

const findByOrder = async (req, res) => {
  const result = await req.context.models.houses_reverse.findOne({
    include: [{
      all: true
    }],
    where: {hove_user_id: req.params.id, hove_status: 'close'}
  })
  return res.send(result);
};

const findById = async (req, res) => {
  const result = await req.context.models.houses_reverse.findByPk(
    req.params.id
  );
  return res.send(result);
};

const createRows = async (req, res) => {
  const { hove_created, hove_status, hove_user_id } = req.body;

  try {
    const result = await req.context.models.houses_reverse.create({
      hove_created: hove_created,
      hove_status: hove_status,
      hove_user_id: hove_user_id,
    });
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const updateRows = async (req, res) => {
  const id = req.params.id;
  const { hove_created, hove_status, hove_user_id } = req.body;

  try {
    const result = await req.context.models.houses_reverse.update(
      {
        hove_created: hove_created,
        hove_status: hove_status,
        hove_user_id: hove_user_id,
      },
      {
        returning: true,
        where: { hove_id: id },
      }
    );
    return res.send(`Update ${result[0]} record`);
  } catch (error) {
    res.sendStatus(404).send(error);
  }
};

const deleteRows = async (req, res) => {
  const id = req.params.id;

  await req.context.models.houses_reverse
    .destroy({
      where: { hove_id: id },
    })
    .then((result) => {
      return res.send(`Delete ${result} record`);
    })
    .catch((error) => {
      return res.sendStatus(404).send(error);
    });
};


export default {
  findAllRows,
  findById,
  createRows,
  updateRows,
  deleteRows,
  findByOrder
};
