const findAllRows = async (req, res) => {
  const result = await req.context.models.houses_bedroom.findAll();
  return res.send(result);
};

const findById = async (req, res) => {
  const result = await req.context.models.houses_bedroom.findByPk(
    req.params.id
  );
  return res.send(result);
};

const createBedroom = async (req, res) => {
  const { hobed_name, hobed_price, hobed_service_fee } = req.body;
  try {
    const result = await req.context.models.houses_bedroom.create({
      hobed_name: hobed_name,
      hobed_price: hobed_price,
      hobed_service_fee: hobed_service_fee,
    });
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const updateBedroom = async (req, res) => {
  const id = req.params.id;
  const { hobed_name, hobed_price, hobed_service_fee } = req.body;

  try {
    const result = await req.context.models.houses_bedroom.update(
      {
        hobed_name: hobed_name,
        hobed_price: hobed_price,
        hobed_service_fee: hobed_service_fee,
      },
      {
        returning: true,
        where: { hobed_id: id },
      }
    );
    return res.send(`Update ${result[0]} bedroom`);
  } catch (error) {
    res.sendStatus(404).send(error);
  }
};

const deleteBedroom = async (req, res) => {
  const id = req.params.id;

  await req.context.models.houses_bedroom
    .destroy({
      where: { hobed_id: id },
    })
    .then((result) => {
      return res.send(`Delete ${result} bedroom`);
    })
    .catch((error) => {
      return res.sendStatus(404).send(error);
    });
};


export default {
  findAllRows,
  findById,
  createBedroom,
  deleteBedroom,
  updateBedroom,
};
