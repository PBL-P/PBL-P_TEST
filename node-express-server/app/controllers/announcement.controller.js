const db = require("../models");
const Announcement = db.announcement;
const multer = require('multer');
const path = require('path');

// **multer 설정 - 파일을 'uploads/announcements/' 디렉토리에 저장**
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // **파일 저장 경로 설정**
  filename: (req, file, cb) => {
    const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8'); // **파일명 디코딩 처리**
    cb(null, Date.now() + '-' + originalName); // **파일명에 타임스탬프 추가하여 고유성 확보**
  }
});

const upload = multer({ storage: storage }); // 파일 업로드를 위한 multer 인스턴스 생성

exports.create = [upload.single('file'), (req, res) => { // **파일 업로드 핸들러 추가**
  console.log("Request Body:", req.body); // 요청 본문 데이터 확인
  console.log("Request File:", req.file); // **요청 파일 데이터 확인**

  const announcement = {
    title: req.body.title,
    content: req.body.content,
    createdBy: req.body.createdBy,
    file_name: req.file ? Buffer.from(req.file.originalname, 'latin1').toString('utf8') : null, // **업로드된 파일명 저장**
    file_path: req.file ? req.file.path : null // **업로드된 파일 경로 저장**
  };

  Announcement.create(announcement)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
}];

exports.findAll = (req, res) => {
  Announcement.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Announcement.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Announcement with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Announcement with id=" + id
      });
    });
};

exports.update = [upload.single('file'), (req, res) => { // **파일 업로드 핸들러 추가**
  const id = req.params.id;

  const updatedData = {
    title: req.body.title,
    content: req.body.content,
    createdBy: req.body.createdBy,
    file_name: req.file ? Buffer.from(req.file.originalname, 'latin1').toString('utf8') : null, // **업로드된 파일명 업데이트**
    file_path: req.file ? req.file.path : null // **업로드된 파일 경로 업데이트**
  };

  Announcement.update(updatedData, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Updated successfully" });
      } else {
        res.send({ message: `Cannot update Announcement with id=${id}` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
}];

exports.delete = (req, res) => {
  const id = req.params.id;

  Announcement.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Deleted successfully" });
      } else {
        res.send({ message: `Cannot delete Announcement with id=${id}` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};
