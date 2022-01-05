const findAll = async (req, res) => {
  const result = await req.context.models.houses_reserve_lines.findAll({
    include: [{
      all: true
    }],
    where: {hrit_hove_id: req.params.id}
  });
  return res.send(result);
};

const findByOrder = async (req, res) => {
  const {hrit_order_name} = req.body
  try {
    const result = await req.context.models.houses_reserve_lines.findAll({
      include: [{
        all: true
      }],
      where: {hrit_order_name: hrit_order_name}
    })
    return res.send(result)
  } catch (error) {
    return error
  }
};

const createRows = async (req, res) => {
  const {
    hrit_checkout,
    hrit_adult,
    hrit_children,
    hrit_infant,
    hrit_total_nights,
    hrit_price,
    hrith_service_fee,
    hrit_subtotal,
    hrit_host_id,
    hrit_hove_id,
    hrith_hobed_id,
    hrit_order_name,
  } = req.body;

  try {
    const result = await req.context.models.houses_reserve_lines.create({
      hrit_checkin: new Date(),
      hrit_checkout: hrit_checkout,
      hrit_adult: hrit_adult,
      hrit_children: hrit_children,
      hrit_infant: hrit_infant,
      hrit_total_nights: hrit_total_nights,
      hrit_price: hrit_price,
      hrith_service_fee: hrith_service_fee,
      hrit_subtotal: hrit_subtotal,
      hrit_host_id: hrit_host_id,
      hrit_hove_id: hrit_hove_id,
      hrith_hobed_id: hrith_hobed_id,
      hrit_order_name: hrit_order_name,
    });
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const updateRows = async (req, res) => {
  const id = req.params.id;
  const {
    hrit_checkout,
    hrit_adult,
    hrit_children,
    hrit_infant,
    hrit_total_nights,
    hrit_price,
    hrith_service_fee,
    hrit_subtotal,
    hrit_host_id,
    hrit_hove_id,
    hrith_hobed_id,
    hrit_order_name,
  } = req.body;

  try {
    const result = await req.context.models.houses_reserve_lines.update(
      {
        hrit_checkin: new Date(),
        hrit_checkout: hrit_checkout,
        hrit_adult: hrit_adult,
        hrit_children: hrit_children,
        hrit_infant: hrit_infant,
        hrit_total_nights: hrit_total_nights,
        hrit_price: hrit_price,
        hrith_service_fee: hrith_service_fee,
        hrit_subtotal: hrit_subtotal,
        hrit_host_id: hrit_host_id,
        hrit_hove_id: hrit_hove_id,
        hrith_hobed_id: hrith_hobed_id,
        hrit_order_name: hrit_order_name,
      },
      {
        retuning: true,
        where: { hrit_id: id },
      }
    );
    return res.send(`Update ${result[0]} record`);
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const deleteRows = async (req, res) => {
  const id = req.params.id;

  await req.context.models.houses_reserve_lines
    .destroy({
      where: { hrit_id: id },
    })
    .then((result) => {
      return res.send(`Delete ${result} record`);
    })
    .catch((error) => {
      return res.sendStatus(404).send(error);
    });
};


export default {
  findAll,
  deleteRows,
  createRows,
  updateRows,
  findByOrder
};
