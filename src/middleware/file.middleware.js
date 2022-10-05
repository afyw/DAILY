const Multer = require('koa-multer');
const path = require('path');
const { AVATAR_PATH } = require('../constants/file-path');
const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, AVATAR_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const avatarUpload = Multer({
  storage: storage
});

const avatarHandle = avatarUpload.single('avatar');

module.exports = {
  avatarHandle
};
