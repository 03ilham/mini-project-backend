import path from "path";
import formidable from "formidable";
import fs from "fs";

const uploadDir = process.cwd() + "/storages/";

const uploadFiles = async (req) => {
  const options = {
    multiples: true,
    keepExtensions: true,
    uploadDir: uploadDir,
    maxFileSize: 50 * 1024 * 1024, // 5MB
  };
  const form = formidable(options);

  // deklarasi promise variable
  const result = new Promise((resolve, reject) => {
    // onpart untuk override stream sebelum di write ke folder
    form.onPart = function (part) {
      if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
        this.handlePart(part);
      } else {
        form._error(new Error("File type is not supported"));
      }
    };

    form.parse(req, (error, fields, files) => {
      if (error) {
        return reject({
          status: "error",
          message: `${error}`,
        });
      }

      let listOfFiles = [];

      if (files) {
        let fileAttr = {
          hoim_id: 0,
          hoim_url_name: "",
          hoim_filesize: 0,
          hoim_filetype: "",
        };

        const seq = path.sep;
        let uploadFile = "";
        let fileName = "";

        files.uploadFile.forEach((el) => {
          uploadFile = el.path;
          fileName = uploadFile
            .substring(uploadFile.lastIndexOf(seq), uploadFile.length)
            .replace(seq, "");

          fileAttr = {
            hoim_id: 0,
            hoim_url_name: fileName,
            hoim_filesize: el.size,
            hoim_filetype: el.type,
          };

          listOfFiles = [...listOfFiles, fileAttr];
        });
      }

      return resolve({
        files: listOfFiles,
        fields: fields,
        status: {
          status: "succeed",
          message: "",
        },
      });
    });
  });
  return result;
};

const uploadSingleFiles = async (req) => {
  const options = {
    multiples: true,
    keepExtensions: true,
    uploadDir: uploadDir,
    maxFileSize: 50 * 1024 * 1024, // 5MB
  };
  const form = formidable(options);

  // deklarasi promise variable
  const result = new Promise((resolve, reject) => {
    // onpart untuk override stream sebelum di write ke folder
    form.onPart = function (part) {
      if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
        this.handlePart(part);
      } else {
        form._error(new Error("File type is not supported"));
      }
    };

    form.parse(req, (error, fields, files) => {
      if (error) {
        return reject({
          status: "error",
          message: `${error}`,
        });
      }

      let listOfFiles = [];

      if (files) {
        let fileAttr = {
          hoim_id: 0,
          hoim_url_name: "",
          hoim_filesize: 0,
          hoim_filetype: "",
        };

        const uploadFile = files.uploadFile.path;
        const seq = path.sep;
        const fileName = uploadFile
        .substring(uploadFile.lastIndexOf(seq), uploadFile.length)
        .replace(seq, "");

          fileAttr = {
            hoim_id: 0,
            hoim_url_name: fileName,
            hoim_filesize: files.uploadFile.size,
            hoim_filetype: files.uploadFile.type,
          };

          listOfFiles = [...listOfFiles, fileAttr];
      }

      return resolve({
        files: listOfFiles,
        fields: fields,
        status: {
          status: "succeed",
          message: "",
        },
      });
    });
  });
  return result;
};

const updateImages = async (req) => {
  const options = {
    multiples: true,
    keepExtensions: true,
    uploadDir: uploadDir,
    maxFileSize: 50 * 1024 * 1024, // 5MB
  };
  const form = formidable(options);

  // deklarasi promise variable
  const result = new Promise((resolve, reject) => {
    // onpart untuk override stream sebelum di write ke folder
    form.onPart = function (part) {
      if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
        this.handlePart(part);
      } else {
        form._error(new Error("File type is not supported"));
      }
    };

    form.parse(req, (error, files) => {
      if (error) {
        return reject({
          status: "error",
          message: `${error}`,
        });
      }

      let listOfFiles = [];

      if (files) {
        let fileAttr = {
          hoim_url_name: "",
          hoim_filesize: 0,
          hoim_filetype: "",
        };

        const uploadFile = files.uploadFile.path;
        const seq = path.sep;
        const fileName = uploadFile
        .substring(uploadFile.lastIndexOf(seq), uploadFile.length)
        .replace(seq, "");

          fileAttr = {
            hoim_url_name: fileName,
            hoim_filesize: files.uploadFile.size,
            hoim_filetype: files.uploadFile.type,
          };

          listOfFiles = {...fileAttr};
      }

      return resolve({
        files: listOfFiles,
        status: {
          status: "succeed",
          message: "",
        },
      });
    });
  });
  return result;
};

const showProductImage = async (req, res) => {
  const filename = req.params.filename;
  const url = `${process.cwd()}/${process.env.UPLOAD_DIR}/${filename}`;
  fs.createReadStream(url)
    .on("error", () => responseNotFound(req, res))
    .pipe(res);
};

function responseNotFound(req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
}

export default {
  uploadFiles,
  responseNotFound,
  showProductImage,
  uploadSingleFiles,
  updateImages,
};
