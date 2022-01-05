import { sequelize } from "../models/IndexModel";

const cekUser = async (req, res, next) => {
  try {
    if (req.params.id === undefined || isNaN(req.params.id))
      res.status(400).send({ message: "Wrong Id User" });
    const user = await req.context.models.users.findOne({
      where: { user_id: req.params.id },
    });
    req.cekUser = {
      user_id: user.user_id,
    };
    next();
  } catch (error) {
    return res.status(500).send({ message: `User ${error}` });
  }
};

const cekcart = async (req, res, next) => {
  const user = req.cekUser || req.cart;

  try {
    const cart = await req.context.models.houses_reverse.findOne({
      include: [
        {
          all: true,
        },
      ],
      where: { hove_user_id: user.user_id, hove_status: "open" },
    });
    req.cekcart = cart;
    next();
  } catch (error) {
    return res.status(404).json({ message: "Input Error" + error });
  }
};

const cekcartCloses = async (req, res, next) => {
  const user = req.cekUser || req.cart;

  try {
    const cart = await req.context.models.houses_reverse.findOne({
      include: [
        {
          all: true,
        },
      ],
      where: { hove_user_id: user.user_id, hove_status: "close" },
    });
    req.cekcart = cart;
    next();
  } catch (error) {
    return res.status(404).json({ message: "Input Error" + error });
  }
};

const create = async (req, res, next) => {
  const cekcr = req.cekcart;
  const user = req.cekUser || req.cart;
  try {
    if (!cekcr) {
      const result = await req.context.models.houses_reverse.create({
        hove_created: new Date(),
        hove_status: "open",
        hove_user_id: user.user_id,
      });
      req.maca = result;
    }
    next();
  } catch (error) {
    return res.status(404).json({ message: "Input Error" + error });
  }
};

const findoutBedroom = async (req, res, next) => {
  try {
    const result = await req.context.models.houses_bedroom.findOne({
      where: { hobed_id: req.body.hobed_id },
    });
    req.bedroom = result;
    next();
  } catch (error) {
    return res.status(404).json({ message: "Input Error" + error });
  }
};

const findoutHouses = async (req, res, next) => {
  try {
    const result = await req.context.models.houses.findOne({
      where: { house_id: req.body.house_id },
    });
    req.houses = result;
    next();
  } catch (error) {
    return res.status(404).json({ message: "Input Error" + error });
  }
};

const cekline = async (req, res, next) => {
  const ceklt = req.maca || req.cekcart;
  const bedroom = req.bedroom;
  const houses = req.houses;
  const hoveId = ceklt.dataValues.hove_id;
  const hobedId = bedroom.dataValues.hobed_id;
  const houseId = houses.dataValues.house_id;
  try {
    const item = await req.context.models.houses_reserve_lines.findOne({
      where: {
        hrit_hove_id: hoveId,
        hrith_hobed_id: hobedId,
        hrit_host_id: houseId,
      },
    });
    req.lineitem = item;
    next();
  } catch (error) {
    return res.status(404).json({ message: "Input Error" + error });
  }
};

const cretaeLine = async (req, res, next) => {
  try {
    const bedroom = req.bedroom;
    const houses = req.houses;
    const hove = req.maca || req.cekcart;
    const cekline = req.lineitem;
    const checkin = new Date(req.body.hrit_checkin);
    const checkout = new Date(req.body.hrit_checkout);
    const milliSecondPerDay = 1000 * 60 * 60 * 24;
    const totalNight = checkout - checkin;
    const totalDay = totalNight / milliSecondPerDay;
    const price =
      (parseInt(bedroom.hobed_price) + parseInt(bedroom.hobed_service_fee)) *
      totalDay;
    if (!cekline) {
      const result = await req.context.models.houses_reserve_lines.create({
        hrit_checkin: checkin,
        hrit_checkout: checkout,
        hrit_total_nights: totalDay,
        hrit_adult: req.body.hrit_adult,
        hrit_infant: req.body.hrit_infant,
        hrit_children: req.body.hrit_children,
        hrit_price: bedroom.hobed_price,
        hrith_service_fee: bedroom.hobed_service_fee,
        hrit_subtotal: price,
        hrit_host_id: houses.house_id,
        hrith_hobed_id: bedroom.hobed_id,
        hrit_hove_id: hove.hove_id,
      });
      return res.send(result);
    }
    return res.send("Item is already");
  } catch (error) {
    return res.send(error);
  }
};

//orders
const findqty = async (req, res, next) => {
  const query = req.cekcart;
  try {
    const sum = await sequelize.query(
      "select count (hrit_hove_id) as qty from houses_reserve_lines where (hrit_hove_id = :liteid)",
      {
        replacements: { liteid: parseInt(query.hove_id) },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    req.all = sum[0];
    next();
  } catch (error) {
    return res.status(500).json({ message: "Find error " + error });
  }
};

const payment = async (req, res, next) => {
  const prices = req.cekcart;
  const payment = {};
  let price = 0;
  let discount = 0;
  let tax = 0;
  let total = 0;
  let totalNight = 0;
  let promo = 0;
  for (const data of prices.houses_reserve_lines) {
    try {
      price += parseInt(data.hrit_subtotal);
      totalNight += data.hrit_total_nights;
      if (data.hrit_total_nights > 1) {
        discount = 0.05 * price;
      }
      tax = (price - discount) * 0.1;
      promo = discount;
      total = price - discount - tax;
      payment["price"] = price;
      payment["discount"] = discount;
      payment["tax"] = tax;
      payment["total"] = total;
      payment["totalNight"] = totalNight;
      payment["promo"] = promo;
    } catch (error) {
      return res.status(500).json({ message: "Find error " + error });
    }
  }
  req.payment = payment;
  next();
};

const cekord = async (req, res, next) => {
  const user = req.cekUser;

  try {
    const order = await req.context.models.orders.findOne({
      include: [
        {
          all: true,
        },
      ],
      where: { order_user_id: user.user_id, order_status: "open" },
    });
    req.cekord = order;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Input error " + error });
  }
};

const createOrder = async (req, res, next) => {
  try {
    const user = req.cekUser;
    const cekorder = req.cekord;
    const append = req.payment;
    const int = parseInt(append.price);
    if (cekorder)
      return res.status(400).send({ message: "Please Finish your order" });
    const order = await req.context.models.orders.create({
      order_created: new Date(),
      order_qty: append.totalNight,
      order_subtotal: int,
      order_tax: append.tax,
      order_discount: append.discount,
      order_promo: append.promo,
      order_status: "open",
      // order_payment_type: null,
      // order_payment_trx: null,
      order_user_id: user.user_id,
      order_total_price: append.total,
    });
    req.orders = order;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Order Error" + error });
  }
};

const closeCart = async (req, res, next) => {
  const order = req.orders || req.cekord;
  const cart = req.cekcart;
  try {
    await req.context.models.houses_reverse.update(
      {
        hove_status: "close",
      },
      {
        returning: true,
        where: { hove_user_id: order.order_user_id, hove_id: cart.hove_id },
      }
    );
    next();
  } catch (error) {
    return res.send(error);
  }
};

const cekLine = async (req, res) => {
  const order = req.orders || req.cekord;
  const closes = req.cekcart;

  for (const data of closes.houses_reserve_lines) {
    try {
      await req.context.models.houses_reserve_lines.update(
        {
          hrit_order_name: order.order_name,
        },
        { returning: true, where: { hrit_id: data.hrit_id } }
      );
    } catch (error) {
      return res.send(error);
    }
  }
  return res.send(order);
};

const cekCartClose = async (req, res, next) => {
  const user = req.cekord;
  const cartcek = req.cekcart;

  try {
    const cart = await req.context.models.houses_reverse.findOne({
      include: [
        {
          all: true,
        },
      ],
      where: {
        hove_user_id: user.order_user_id,
        hove_id: cartcek.hove_id,
        hove_status: "close",
      },
    });
    req.cekcart = cart;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Input Error" + error });
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const user = req.cekUser;
    const cekorder = req.cekord;
    if (cekord) {
      const order = await req.context.models.orders.update(
        {
          order_payment_trx: req.body.order_payment_trx,
          order_status: "paid",
        },
        {
          where: {
            order_user_id: user.user_id,
            order_name: cekorder.order_name,
          },
        }
      );
      req.orders = order;
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Order Error" + error });
  }
};

const checkPay = async (req, res) => {
  const orderd = req.orders || req.cekord;
  const closes = req.cekcart;

  for (const data of closes.houses_reserve_lines) {
    try {
      await req.context.models.houses_reserve_lines.update(
        {
          hrit_order_name: orderd.order_name,
        },
        {
          returning: true,
          where: { hrit_id: data.hrit_id },
        }
      );
    } catch (error) {
      return res.send(error);
    }
  }
  return res.send("Thanks for your shopping");
};

//cancel order
const censelOrder = async (req, res) => {
  try {
    const user = req.cekUser;
    const cekOrder = req.cekord;
    if (cekOrder) {
      const order = await req.context.models.orders.update(
        {
          order_status: "cancelled",
        },
        {
          where: {
            order_user_id: user.user_id,
            order_name: cekOrder.order_name,
          },
        }
      );
    }
  } catch (error) {
    return res.status(500).json({ message: "Order Error" + error });
  }
  return res.send("canceleed");
};

const updateLineItem = async (req, res) => {
  try {
    const bedroom = req.bedroom;
    const houses = req.houses;
    const hove = req.maca || req.cekcart;
    const cekline = req.lineitem;
    const checkin = new Date(req.body.hrit_checkin);
    const checkout = new Date(req.body.hrit_checkout);
    const milliSecondPerDay = 1000 * 60 * 60 * 24;
    const totalNight = checkout - checkin;
    const totalDay = totalNight / milliSecondPerDay;
    const price =
      (parseInt(bedroom.hobed_price) + parseInt(bedroom.hobed_service_fee)) *
      totalDay;
    const item = await req.context.models.houses_reserve_lines.update(
      {
        hrit_checkin: checkin,
        hrit_checkout: checkout,
        hrit_total_nights: totalDay,
        hrit_adult: req.body.adult,
        hrit_infant: req.body.infant,
        hrit_children: req.body.children,
      },
      { returning: true, where: { hrit_id: cekline.hrit_id } }
    );
    return res.send(item);
  } catch (error) {
    return res.send(error);
  }
};

export default {
  cekUser,
  cekcart,
  create,
  findoutBedroom,
  findoutHouses,
  cekline,
  cretaeLine,
  //order
  findqty,
  payment,
  cekord,
  createOrder,
  closeCart,
  cekLine,
  //update order
  cekCartClose,
  updateOrder,
  checkPay,
  //cancel order
  censelOrder,
  cekcartCloses,
  //update line item
  updateLineItem,
};
