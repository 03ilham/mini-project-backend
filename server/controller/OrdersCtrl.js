const createOrders = async (req, res) => {
  const {
    order_subtotal,
    order_qty,
    order_tax,
    order_discount,
    order_promo,
    order_total_price,
    order_status,
    order_payment_type,
    order_payment_trx,
    order_user_id,
  } = req.body;

  try {
    const result = await req.context.models.orders.create({
      order_created: new Date (),
      order_subtotal: order_subtotal,
      order_qty: order_qty,
      order_tax: order_tax,
      order_discount: order_discount,
      order_promo: order_promo,
      order_status: order_status,
      order_total_price: order_total_price,
      order_payment_type: order_payment_type,
      order_payment_trx: order_payment_trx,
      order_user_id: order_user_id,
    });
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
}; 


const findAll = async(req,res)=>{
  const result = await req.context.models.orders.findOne({
    include: [{
      all: true
    }],
    where: {order_user_id: req.params.id, order_status: 'open'}
  });
  return res.send(result)
}

const cancelOrder = async(req,res)=>{
  const result = await req.context.models.orders.findAll({
    include: [{
      all: true
    }],
    where: {order_user_id: req.params.id, order_status: 'cancelled'}
  });
  return res.send(result)
}



export default {
  createOrders,
  findAll,
  cancelOrder,
};
