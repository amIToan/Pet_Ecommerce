const path = require("path");
const dirname = path.dirname
const { fileURLToPath } = require("url");
const multer = require("multer");
const shortId = require("shortid");
// const ___filename = fileURLToPath(import.meta.url);
const ___filename = fileURLToPath(require('url').pathToFileURL(__filename).toString());
const ___dirname = dirname(___filename);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(___dirname), "uploaded_Images"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
const fileImageRoot = (x) =>
  path.join(path.dirname(___dirname), "uploaded_Images", x);

module.exports = { upload, fileImageRoot }
// console.log(fileImageRoot("fdfd.txt"));
