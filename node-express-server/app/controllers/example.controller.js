const db = require("../models");
const Example = db.example;
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
    console.log("Decoded Filename:", originalName); // 디코딩된 파일명 출력 확인
    cb(null, originalName); // 파일명에 타임스탬프 추가하여 저장
  }
});


const upload = multer({ storage: storage });
// Create and Save a new Example
exports.create = [upload.single('file'), (req, res) => {
  console.log("Request Body:", req.body);    // 텍스트 필드 데이터 확인
  console.log("Request File:", req.file);    // 파일 데이터 확인

  if (!req.body.content) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // 파일명이 깨지지 않도록 디코딩 처리
  const decodedFileName = req.file ? Buffer.from(req.file.originalname, 'latin1').toString('utf8') : null;

  const example = {
    document_type_id: req.body.document_type_id || 1,
    title: req.body.title,
    content: req.body.content,
    file_name: decodedFileName,  // 디코딩된 파일명 사용
    file_path: req.file ? req.file.path : null
  };

  Example.create(example)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Example."
      });
    });
}];

// 요청 경로에 따라 List 뽑기
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
    // document_type 테이블에서 key를 기준으로 document_type_id 가져오기
    
    if (!documentTypeKey) {
      return res.status(404).send({ message: "Invalid document type in URL" });
    }

    // 조건절 설정: title과 document_type_id 조건을 추가
    const condition = { 
      ...(title && { title: { [Op.like]: `%${title}%` } }),
      document_type_id: documentTypeKey
    };

    console.log("Condition:", condition); // 조건 확인용 로그

    // Example 테이블에서 조건에 맞는 데이터 조회
    const data = await Example.findAll({ where: condition });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving examples."
    });
  }
};

// Find a single Example with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Example.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Example with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Example with id=" + id
      });
    });
};

// Update an Example by the id in the request
exports.update = [upload.single('file'), (req, res) => {
  console.log("Update Request Body:", req.body);
  console.log("Update Request File:", req.file);

  const id = req.params.id;

  // 데이터베이스에서 기존 데이터를 가져옵니다.
  Example.findByPk(id)
      .then(example => {
          if (!example) {
              res.status(404).send({ message: `Cannot find Example with id=${id}.` });
              return;
          }

          // 파일명이 깨지지 않도록 디코딩 처리
          const decodedFileName = req.file ? Buffer.from(req.file.originalname, 'latin1').toString('utf8') : example.file_name;

          // 새로운 파일이 없으면 기존 파일 경로와 이름을 유지합니다.
          const updatedData = {
              document_type_id: req.body.document_type_id || example.document_type_id,
              title: req.body.title || example.title,
              content: req.body.content || example.content,
              file_name: req.file ? decodedFileName : example.file_name,  // 디코딩된 파일명 사용
              file_path: req.file ? req.file.path : example.file_path
          };

          // 데이터베이스에서 업데이트를 수행합니다.
          Example.update(updatedData, {
              where: { id: id }
          })
          .then(num => {
              if (num == 1) {
                  res.send({ message: "Example was updated successfully." });
              } else {
                  res.send({
                      message: `Cannot update Example with id=${id}. Maybe Example was not found or req.body is empty!`
                  });
              }
          })
          .catch(err => {
              res.status(500).send({
                  message: "Error updating Example with id=" + id
              });
          });
      })
      .catch(err => {
          res.status(500).send({
              message: "Error retrieving Example with id=" + id
          });
      });
}];





// Delete an Example with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Example.findByPk(id)
    .then(example => {
      if (example && example.file_path) {
        fs.unlink(example.file_path, (err) => {
          if (err) console.log("Failed to delete file:", err);
        });
      }
      return Example.destroy({ where: { id: id } });
    })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Example was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Example with id=${id}. Maybe Example was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Example with id=" + id
      });
    });
};

// Delete all examples from the database
exports.deleteAll = (req, res) => {
  Example.findAll()
    .then(examples => {
      examples.forEach(example => {
        if (example.file_path) {
          fs.unlink(example.file_path, (err) => {
            if (err) console.log("Failed to delete file:", err);
          });
        }
      });
      return Example.destroy({ where: {}, truncate: false });
    })
    .then(nums => res.send({ message: `${nums} examples were deleted successfully!` }))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while removing all examples."
    }));
};

// Find examples by title
exports.findByTitle = (req, res) => {
  const title = req.query.title;

  Example.findAll({ where: { title: { [Op.like]: `%${title}%` } } })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error occurred while searching by title"
      });
    });
};
