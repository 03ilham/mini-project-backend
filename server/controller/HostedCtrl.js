import UpDownloadHelpers from "../helpers/UpDownloadHelpers";

const findAllRows = async (req, res) => {
  const result = await req.context.models.hosted.findAll();
  return res.send(result);
};

const findById = async (req, res) => {
  try {
    const result = await req.context.models.hosted.findByPk(req.params.id);
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const createRows = async (req, res) => {
  const { hosted_fullname, hosted_level } = req.body;

  try {
    const result = await req.context.models.hosted.create({
      hosted_fullname: hosted_fullname,
      hosted_level: hosted_level,
    });
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const updateRows = async (req, res) => {
  const { hosted_fullname, hosted_level } = req.body;

  try {
    const result = await req.context.models.hosted.update(
      {
        hosted_fullname: hosted_fullname,
        hosted_level: hosted_level,
      },
      {
        returning: true,
        where: { hosted_acc: req.params.id },
      }
    );
    return res.send(`Upadte ${result[0]} record`);
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const deleteRows = async (req, res) => {
  const id = req.params.id;

  await req.context.models.hosted
    .destroy({
      where: { hosted_acc: id },
    })
    .then((result) => {
      return res.send(`Delete ${result} hosted`);
    })
    .catch((error) => {
      return res.sendStatus(404).send(error);
    });
};

const createHosted = async (req,res, next) => {
  try {
    const hosteed = await UpDownloadHelpers.uploadSingleFiles(req);
    const {
      files,
      fields,
    } = hosteed;
    try {
      const result = await req.context.models.hosted.create({
        hosted_fullname: fields.hosted_fullname,
        hosted_level: fields.hosted_level
      })
      req.hostedId = result.dataValues.hosted_acc;
      req.files = files
      req.fields = fields
      next()
    } catch (error) {
      return res.send(error)
    }
  } catch (error) {
    return res.send(error)
  }
}

export default {
  findAllRows,
  findById,
  createRows,
  updateRows,
  deleteRows,
  createHosted
};
