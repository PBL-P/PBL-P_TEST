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
exports.create = [upload.array('files', 5), async (req, res) => {
  try {
    // 파일명과 경로를 |로 구분하여 하나의 문자열로 저장
    const fileNames = req.files.map(file => Buffer.from(file.originalname, 'latin1').toString('utf8')).join('|');
    const filePaths = req.files.map(file => file.path).join('|');

    const submission = {
      document_type_id: req.body.document_type_id || 1,
      title: req.body.title,
      teamName: req.body.teamName,
      member: req.body.member,
      thought: req.body.thought,
      fileName: fileNames, // 다중 파일 이름
      filePath: filePaths  // 다중 파일 경로
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
        // 파일 이름과 경로를 배열로 변환
        const fileNames = data.fileName ? data.fileName.split('|') : [];
        const filePaths = data.filePath ? data.filePath.split('|') : [];

        // 수정된 응답 데이터로 설정
        const responseData = {
          ...data.toJSON(),
          fileNames: fileNames,
          filePaths: filePaths
        };

        res.send(responseData);
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

// Update a Submission by the id in the request
exports.update = [upload.array('files', 5), (req, res) => {
  console.log("Update Request Body:", req.body);
  console.log("Update Request Files:", req.files);

  const id = req.params.id;

  // 데이터베이스에서 기존 데이터를 가져옵니다.
  Submission.findByPk(id)
      .then(submission => {
          if (!submission) {
              res.status(404).send({ message: `Cannot find Submission with id=${id}.` });
              return;
          }

          // 새로운 파일이 업로드된 경우, 파일명과 경로를 |로 구분하여 문자열로 저장
          const fileNames = req.files ? req.files.map(file => Buffer.from(file.originalname, 'latin1').toString('utf8')).join('|') : submission.file_name;
          const filePaths = req.files ? req.files.map(file => file.path).join('|') : submission.file_path;

          // 업데이트할 데이터를 준비합니다.
          const updatedData = {
              document_type_id: req.body.document_type_id || submission.document_type_id,
              title: req.body.title || submission.title,
              teamName: req.body.teamName || submission.teamName,
              member: req.body.member || submission.member,
              thought: req.body.thought || submission.thought,
              file_name: fileNames,
              file_path: filePaths
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

// Delete a Submission with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Submission.findByPk(id)
    .then(submission => {
      if (submission && submission.file_path) {
        // 파일 경로들을 배열로 나누기
        const filePaths = submission.file_path.split('|');
        
        // 각각의 파일 경로에 대해 파일 삭제
        filePaths.forEach(filePath => {
          fs.unlink(filePath, (err) => {
            if (err) console.log("Failed to delete file:", err);
          });
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
          // 파일 경로가 다중 파일 형태로 저장되어 있으면 |로 분리하여 각각 삭제
          const filePaths = submission.file_path.split('|');
          filePaths.forEach(filePath => {
            fs.unlink(filePath, (err) => {
              if (err) console.log("Failed to delete file:", err);
            });
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
