import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, req.brand + "-" + req.model + Date.now());
  },
});

const upload = multer({ storage: storage });

export default upload;
