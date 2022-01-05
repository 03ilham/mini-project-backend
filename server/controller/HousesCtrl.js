import UpDownloadHelpers from "../helpers/UpDownloadHelpers";
import { Op } from "sequelize";
import Pagination from "../helpers/Pagination";

const housesPaging = async (req, res) => {
  const { page, size, cari, order } = req.body;
  const houses = req.params.id ? req.params.id : null;

  let condition =
    houses && cari
      ? {
          house_id: houses,
          [Op.or]: [
            { house_name: { [Op.like]: `%${cari}%` } },
            { house_title: { [Op.like]: `%${cari}%` } },
            { house_city: { [Op.like]: `%${cari}%` } },
          ],
        }
      : cari
      ? {
          [Op.or]: [
            { house_name: { [Op.like]: `%${cari}%` } },
            { house_title: { [Op.like]: `%${cari}%` } },
            { house_city: { [Op.like]: `%${cari}%` } },
          ],
        }
      : houses
      ? {
          house_id: houses,
        }
      : null;

  let orderBy = order
    ? order === "asc"
      ? [["house_title", "ASC"]]
      : [["house_title", "DESC"]]
    : [["house_title", "ASC"]];

  const { limit, offset } = Pagination.getPagination(page, size);

  try {
    const houses = await req.context.models.houses.findAndCountAll({
      where: condition,
      limit,
      offset,
      order: orderBy,
    });

    const response = Pagination.getPagingData(houses, page, limit);

    res.send(response);
  } catch (error) {
    console.log(error.message);
  }
};

const findAll = async (req, res) => {
  const result = await req.context.models.houses.findAll({
    include: [
      {
        all: true,
      },
    ],
  });
  return res.send(result);
};

const findOne = async (req, res) => {
  const result = await req.context.models.houses.findOne({
    include: [
      {
        all: true,
      },
    ],
    where: { house_id: req.params.id },
  });
  return res.send(result);
};

const findById = async (req, res) => {
  try {
    const result = await req.context.models.houses.findByPk(req.params.id);
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const deleteHouses = async (req, res) => {
  const id = req.params.id;

  await req.context.models.houses
    .destroy({
      where: { house_id: id },
    })
    .then((result) => {
      return res.send(`Delete ${result} houses`);
    })
    .cath((error) => {
      return res.sendStatus(404).send(error);
    });
};

const createHouseImages = async (req, res, next) => {
  try {
    const houseImages = await UpDownloadHelpers.uploadFiles(req);
    const {
      files,
      fields,
      status: { status },
    } = houseImages;
    const urlName = files[0];
    const urlImages = urlName.hoim_url_name;
    try {
      const result = await req.context.models.houses.create({
        house_name: fields.name,
        house_title: fields.title,
        house_ratting: parseInt(fields.ratting),
        house_bedrooms: parseInt(fields.bedrooms),
        house_occupied: parseInt(fields.occupied),
        house_beds: parseInt(fields.beds),
        house_baths: parseInt(fields.baths),
        house_address: fields.address,
        house_province: fields.province,
        house_city: fields.city,
        house_country: fields.country,
        house_latitude: fields.latitude,
        house_longitude: fields.longitude,
        house_offer: fields.offer,
        house_approval: fields.approval,
        house_hosted_account: fields.hosted_account,
        house_url_images: urlImages,
      });

      //simpan houseId di objek req
      req.houseId = result.dataValues.house_id;
      req.fields = fields;
      req.files = files;
      next();
    } catch (error) {
      return res.sendStatus(404).send(error);
    }
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const updateHouseImages = async (req, res, next) => {
  try {
    const houseImages = await UpDownloadHelpers.uploadFiles(req);
    const {
      files,
      fields,
      status: { status },
    } = houseImages;
    try {
      const result = await req.context.models.houses.update(
        {
          house_name: fields.name,
          house_title: fields.title,
          house_ratting: parseInt(fields.ratting),
          house_bedrooms: parseInt(fields.bedrooms),
          house_occupied: parseInt(fields.occupied),
          house_beds: parseInt(fields.beds),
          house_baths: parseInt(fields.baths),
          house_address: fields.address,
          house_province: fields.province,
          house_city: fields.city,
          house_country: fields.country,
          house_latitude: fields.latitude,
          house_longitude: fields.longitude,
          house_offer: fields.offer,
          house_approval: fields.approval,
          house_hosted_account: fields.hosted_account,
        },
        {
          returning: true,
          where: { house_id: req.params.id },
        }
      );
      // req.hoimHousId = result[1]
      // req.Id = req.hoimHousId[0].dataValues.house_id
      // req.files = files
      // next()
      return res.send(result);
    } catch (error) {
      return res.sendStatus(404).send(error);
    }
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const createSingleImages = async (req, res, next) => {
  const fields = req.fields;
  const hostedId = req.hostedId;
  const files = req.files;
  const urlName = files[0];
  const urlImages = urlName.hoim_url_name;
  try {
    const result = await req.context.models.houses.create({
      house_name: fields.name,
      house_title: fields.title,
      house_bedrooms: parseInt(fields.bedrooms),
      house_occupied: parseInt(fields.occupied),
      house_beds: parseInt(fields.beds),
      house_baths: parseInt(fields.baths),
      house_address: fields.address,
      house_province: fields.province,
      house_city: fields.city,
      house_country: fields.country,
      house_latitude: fields.latitude,
      house_longitude: fields.longitude,
      house_offer: fields.offer,
      house_approval: fields.approval,
      house_url_images: urlImages,
      house_hosted_account: hostedId,
      house_ratting: undefined,
    });
    //simpan prodId di objek req
    req.houseId = result.dataValues.house_id;
    req.files = files;
    //req.houses = result.dataValues;
    next();
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};
// const createSingleImages = async (req, res, next) => {
//   try {
//     const houseImages = await UpDownloadHelpers.uploadSingleFiles(req);
//     const {
//       files,
//       fields,
//       status: { status },
//     } = houseImages;
//     const urlName = files[0];
//     const urlImages = urlName.hoim_url_name;
//     try {
//       const result = await req.context.models.houses.create({
//         house_name: fields.name,
//         house_title: fields.title,
//         house_bedrooms: parseInt(fields.bedrooms),
//         house_occupied: parseInt(fields.occupied),
//         house_beds: parseInt(fields.beds),
//         house_baths: parseInt(fields.baths),
//         house_address: fields.address,
//         house_province: fields.province,
//         house_city: fields.city,
//         house_country: fields.country,
//         house_latitude: fields.latitude,
//         house_longitude: fields.longitude,
//         house_offer: fields.offer,
//         house_approval: fields.approval,
//         house_url_images: urlImages,
//         house_hosted_account: null,
//         house_ratting: null
//       });
//       //simpan prodId di objek req
//       req.houseId = result.dataValues.house_id;
//       req.files = files;
//       req.houses = result.dataValues
//       next();
//     } catch (error) {
//       return res.sendStatus(404).send(error);
//     }
//   } catch (error) {
//     return res.sendStatus(404).send(error);
//   }
// };

const cekHouse = async (req, res, next) => {
  try {
    if (req.params.id === undefined || isNaN(req.params.id))
      return res.status(404).send({ message: "wrong id" });

    const id = await req.context.models.findOne({
      where: { house_id: req.params.id },
    });
    req.houseId = {
      house_id: id.house_id,
    };
    next();
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const findHouses = async (req, res) => {
  const houseId = req.houseId;
  const hostedId = req.hostedId;
  try {
    const result = await req.context.models.houses.findOne({
      include: [
        {
          all: true,
        },
      ],
      where: { house_id: houseId, house_hosted_account: hostedId },
    });
    return res.send(result);
  } catch (error) {
    return error;
  }
};

const updateRows = async (req, res) => {
  const {
    house_name,
    house_address,
    house_title,
    house_baths,
    house_bedrooms,
    house_beds,
    house_city,
    house_country,
    house_latitude,
    house_longitude,
    house_occupied,
    house_offer,
    house_province,
  } = req.body;

  try {
    const result = await req.context.models.houses.update(
      {
        house_name: house_name,
        house_address: house_address,
        house_baths: house_baths,
        house_beds: house_beds,
        house_bedrooms: house_bedrooms,
        house_city: house_city,
        house_country: house_country,
        house_latitude: house_latitude,
        house_longitude: house_longitude,
        house_occupied: house_occupied,
        house_title: house_title,
        house_offer: house_offer,
        house_province: house_province,
      },
      { returning: true, where: { house_id: req.params.id } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

export default {
  findAll,
  deleteHouses,
  findById,
  createHouseImages,
  updateHouseImages,
  createSingleImages,
  cekHouse,
  findHouses,
  findOne,
  housesPaging,
  updateRows,
};
