const findAllRows = async (req, res) => {
  const result = await req.context.models.houses_reviews.findAll();
  return res.send(result);
};

const findById = async (req, res) => {
  const result = await req.context.models.houses_reviews.findByPk(
    req.params.id
  );
  return res.send(result);
};

const create = async (req, res) => {
  const { hore_comments, hore_ratting, hore_user_id, hore_host_id } = req.body;
  try {
    const result = await req.context.models.houses_reviews.create({
      hore_comments: hore_comments,
      hore_ratting: hore_ratting,
      hore_user_id: hore_user_id,
      hore_host_id: hore_host_id,
    });
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const update = async (req, res) => {
  const { hore_comments, hore_ratting, hore_user_id, hore_host_id } = req.body;
  try {
    const result = await req.context.models.houses_reviews.update(
      {
        hore_comments: hore_comments,
        hore_ratting: hore_ratting,
        hore_user_id: hore_user_id,
        hore_host_id: hore_host_id,
      },
      {
        returning: true,
        where: { hore_id: req.params.id },
      }
    );
    return res.send(`Update ${result[0]} record`);
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const deleteRows = async (req, res) => {
  const id = req.params.id;

  await req.context.models.houses_reviews
    .destroy({
      where: { hore_id: id },
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
  create,
  update,
  deleteRows,
  findById,
};
