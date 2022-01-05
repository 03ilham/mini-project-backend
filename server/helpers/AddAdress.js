import formidable from "formidable";

const addAdres = async (req, res, next) => {
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
          addr_id: 0,
          addressName: "",
          addressDetail: "",
          addressLatitude: "",
          addressLongitude: "",
        };

        fileAttr = {
          addr_id: 0,
          addressName: fields.addressName,
          addressDetail: fields.addressDetail,
          addressLatitude: fields.addressLatitude,
          addressLongitude: fields.addressLongitude,
          username: fields.username,
          email: fields.email,
          roleType: fields.roles
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
  addAdres,
};
