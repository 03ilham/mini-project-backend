import UpDownloadHelpers from "../helpers/UpDownloadHelpers";

const createHouseImages = async (req, res, next) => {
  const files = req.files;
  const houseId = req.houseId;

  const rowImages = files.map((el) => {
    return { ...el, hoim_host_id: houseId };
  });

  try {
    const result = await req.context.models.house_images.bulkCreate(rowImages);

    req.houseId = houseId;
    next();
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const findHouseImageById = async (req, res) => {
  const houseId = req.houseId;
  const houses = req.houses
  try {
    const result = await req.context.models.house_images.findAll({
      where: { hoim_host_id: parseInt(houseId) },
    });
    return res.send(houses)
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const updateImages = async (req, res) => {
  try {
    const houseImages = await UpDownloadHelpers.updateImages(req);
    const {
      files,
      status: { status },
    } = houseImages;
    try {
      const result = await req.context.models.house_images.update(
        {
          hoim_url_name: files.hoim_url_name,
          hoim_filesize: files.hoim_filesize,
          hoim_filetype: files.hoim_filetype,
        },
        {
          returning: true,
          where: { hoim_id: req.params.id },
        }
      );
      return res.send(result);
    } catch (error) {
      return res.sendStatus(404).send(error);
    }
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const findAll = async (req, res) => {
  const result = await req.context.models.house_images.findAll();
  return res.send(result);
};

const deleteImages = async (req, res) => {
  const id = req.params.id;
  await req.context.models.house_images
    .destroy({
      where: { hoim_id: id },
    })
    .then((result) => {
      return res.send(`Delete ${result} images`);
    })
    .catch((error) => {
      return res.sendStatus(404).send(error);
    });
};

const cretaeRow = async (req, res) => {
  try {
    const record = await UpDownloadHelpers.uploadSingleFiles(req);
    const files = record;
    const render = record.files[0];
    try {
      const result = await req.context.models.house_images.create({
        hoim_url_name: render.hoim_url_name,
        hoim_filesize: render.hoim_filesize,
        hoim_filetype: render.hoim_filetype,
        hoim_host_id: 27,
      });
      return res.send(result);
    } catch (error) {
      return res.sendStatus(404).send(error);
    }
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const updateRow = async (req, res) => {
  const id = req.params.id;
  try {
    const record = await UpDownloadHelpers.uploadSingleFiles(req);
    const files = record;
    const render = record.files[0];
    try {
      const result = await req.context.models.house_images.update(
        {
          hoim_url_name: render.hoim_url_name,
          hoim_filesize: render.hoim_filesize,
          hoim_filetype: render.hoim_filetype,
        },
        { where: { hoim_id: files.fields.id } }
      );
      return res.send(result);
    } catch (error) {
      return res.sendStatus(404).send(error);

    }
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

export default {
  createHouseImages,
  findHouseImageById,
  updateImages,
  findAll,
  deleteImages,
  cretaeRow,
  updateRow
};
