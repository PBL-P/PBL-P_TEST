const db = require("../models");
const Submission = db.submission;
const Op = db.Sequelize.Op;
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const DocumentType = db.document_type; 

// 파일 업로드를 위한 multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // 파일이 저장될 경로 설정
  },
  filename: function (req, file, cb) {
    // 파일명을 UTF-8로 변환하여 저장
    const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8'); 
    cb(null, originalName); // 파일명에 타임스탬프 추가하여 저장
  }
});


const upload = multer({ storage: storage });
// Create and Save a new Submission
// Create and Save a new Submission
exports.create = [upload.single('file'), async (req, res) => {
  
  try {
    // 파일명이 깨지지 않도록 디코딩 처리
    const decodedFileName = req.file ? Buffer.from(req.file.originalname, 'latin1').toString('utf8') : null;

    const submission = {
      document_type_id: req.body.document_type_id || 1,
      title: req.body.title,
      teamName: req.body.teamName,
      member: req.body.member,
      thought: req.body.thought,
      fileName: decodedFileName,
      filePath: req.file ? req.file.path : null
    };

    
    // 데이터베이스에 새 제출물 저장
    const data = await Submission.create(submission);
    return res.status(201).send(data);  // 성공 시 응답 반환
  } catch (err) {
    console.error("Error during submission creation:", err.message);
    return res.status(500).send({
      message: err.message || "Some error occurred while creating the Submission."
    });
  }
}];


exports.findAll = async (req, res) => {
  const title = req.query.title;

  // 요청된 API 경로를 기준으로 type_name을 설정
  const pathPart = req.originalUrl.split('/')[3];

  let documentTypeKey = null;

  // 요청 경로에 따라 document_type 테이블의 key를 설정
  if (pathPart === "proposal") documentTypeKey = "pro";
  else if (pathPart === "plan") documentTypeKey = "pl";
  else if (pathPart === "design") documentTypeKey = "des";
  else if (pathPart === "report") documentTypeKey = "rep";

  try {
    if (!documentTypeKey) {
      return res.status(404).send({ message: "Invalid document type in URL" });
    }

    // 로그 추가: documentTypeKey 값 확인
    console.log("Document Type Key:", documentTypeKey);

    // 조건절 설정: title과 document_type_id 조건을 추가
    const condition = {
      ...(title && { title: { [Op.like]: `%${title}%` } }),
      document_type_id: documentTypeKey // 문자열 타입으로 비교됨
    };

    console.log("Condition:", condition); // 조건 확인용 로그

    // Submission 테이블에서 조건에 맞는 데이터 조회
    const data = await Submission.findAll({ where: condition });
    res.send(data);
  } catch (err) {
    console.error("Error during findAll:", err); // 에러 로그 추가
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving submissions."
    });
  }
};



// Find a single Submission with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  
  Submission.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Submission with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Submission with id=" + id
      });
    });
};

// Update an Submission by the id in the request
exports.update = [upload.single('file'), (req, res) => {
  console.log("Update Request Body:", req.body);
  console.log("Update Request File:", req.file);

  const id = req.params.id;

  // 데이터베이스에서 기존 데이터를 가져옵니다.
  Submission.findByPk(id)
      .then(submission => {
          if (!submission) {
              res.status(404).send({ message: `Cannot find Submission with id=${id}.` });
              return;
          }

          // 파일명이 깨지지 않도록 디코딩 처리
          const decodedFileName = req.file ? Buffer.from(req.file.originalname, 'latin1').toString('utf8') : submission.file_name;

          // 새로운 파일이 없으면 기존 파일 경로와 이름을 유지합니다.
          const updatedData = {
              document_type_id: req.body.document_type_id || submission.document_type_id,
              title: req.body.title || submission.title,
              teamName: req.body.teamName || submission.teamName,
              member: req.body.member || submission.member,
              thought: req.body.thought || submission.thought,
              file_name: req.file ? decodedFileName : submission.file_name,  // 디코딩된 파일명 사용
              file_path: req.file ? req.file.path : submission.file_path
          };

          // 데이터베이스에서 업데이트를 수행합니다.
          Submission.update(updatedData, {
              where: { id: id }
          })
          .then(num => {
              if (num == 1) {
                  res.send({ message: "Submission was updated successfully." });
              } else {
                  res.send({
                      message: `Cannot update Submission with id=${id}. Maybe Submission was not found or req.body is empty!`
                  });
              }
          })
          .catch(err => {
              res.status(500).send({
                  message: "Error updating Submission with id=" + id
              });
          });
      })
      .catch(err => {
          res.status(500).send({
              message: "Error retrieving Submission with id=" + id
          });
      });
}];





// Delete an Submission with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Submission.findByPk(id)
    .then(submission => {
      if (submission && submission.file_path) {
        fs.unlink(submission.file_path, (err) => {
          if (err) console.log("Failed to delete file:", err);
        });
      }
      return Submission.destroy({ where: { id: id } });
    })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Submission was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Submission with id=${id}. Maybe Submission was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Submission with id=" + id
      });
    });
};

// Delete all submissions from the database
exports.deleteAll = (req, res) => {
  Submission.findAll()
    .then(submissions => {
      submissions.forEach(submission => {
        if (submission.file_path) {
          fs.unlink(submission.file_path, (err) => {
            if (err) console.log("Failed to delete file:", err);
          });
        }
      });
      return Submission.destroy({ where: {}, truncate: false });
    })
    .then(nums => res.send({ message: `${nums} submissions were deleted successfully!` }))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while removing all submissions."
    }));
};

// Find submissions by title
exports.findByTitle = (req, res) => {
  const title = req.query.title;

  Submission.findAll({ where: { title: { [Op.like]: `%${title}%` } } })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error occurred while searching by title"
      });
    });
};
