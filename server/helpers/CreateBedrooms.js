import formidable from "formidable";

const addBedrooms = async (req, res, next) => {
  const form = formidable();

  const result = new Promise((resolve, reject) => {
    form.parse(req, (error, fields) => {
      if (error) {
        return reject({
          status: "error",
          message: `${error}`,
        });
      }

      let listOfFiles = [];

      if (fields) {
        let fileAttr = {
          hobed_id: 0,
          bedroomName: "",
          price: "",
          serviceFee: "",
          adult: "",
          children: "",
          infant: "",
        };

        fileAttr = {
          hobed_id: 0,
          bedroomName: fields.bedroomName,
          price: parseInt(fields.price),
          serviceFee: parseInt(fields.serviceFee),
          adult: fields.adult,
          children: fields.children,
          infant: fields.infant,
          checkin: fields.checkin,
          checkout: fields.checkout,
          totalNight: fields.totalNight,
          jumlah: fields.jumlah
        };

        listOfFiles = {...fileAttr};
      }
      return resolve({
        fields: fields,
        files: listOfFiles,
        status: {
          status: "succed",
          message: "",
        },
      });
    });
  });
  return result;
};

export default {
  addBedrooms,
};