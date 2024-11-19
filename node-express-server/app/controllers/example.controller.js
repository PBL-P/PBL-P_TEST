const db = require("../models");
const Example = db.example;
const DocumentType = db.document_type;
const Op = db.Sequelize.Op;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 파일 업로드 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const originalName = Buffer.from(file.originalname, "latin1").toString("utf8");
    console.log("Decoded Filename:", originalName);
    cb(null, originalName);
  },
});

const upload = multer({ storage: storage });

// Create and Save a new Example
exports.create = [upload.single("file"), async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Request File:", req.file);

  if (!req.body.content) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  try {
    // document_type_id 검증
    const documentType = await DocumentType.findByPk(req.body.document_type_id);
    if (!documentType) {
      return res.status(400).send({ message: "Invalid document_type_id!" });
    }

    const decodedFileName = req.file
      ? Buffer.from(req.file.originalname, "latin1").toString("utf8")
      : null;

    const example = {
      document_type_id: req.body.document_type_id,
      title: req.body.title,
      content: req.body.content,
      file_name: decodedFileName,
      file_path: req.file ? req.file.path : null,
    };

    const data = await Example.create(example);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Example.",
    });
  }
}];

// Find all Examples
exports.findAll = async (req, res) => {
  const { title, document_type_id } = req.query;

  try {
    const condition = {
      ...(title && { title: { [Op.like]: `%${title}%` } }),
      ...(document_type_id && { document_type_id }),
    };

    const data = await Example.findAll({ where: condition });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving examples.",
    });
  }
};

// Find a single Example by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Example.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Example with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Example with id=" + id,
      });
    });
};

// Update an Example
exports.update = [upload.single("file"), (req, res) => {
  console.log("Update Request Body:", req.body);
  console.log("Update Request File:", req.file);

  const id = req.params.id;

  Example.findByPk(id)
    .then((example) => {
      if (!example) {
        res.status(404).send({ message: `Cannot find Example with id=${id}.` });
        return;
      }

      const decodedFileName = req.file
        ? Buffer.from(req.file.originalname, "latin1").toString("utf8")
        : example.file_name;

      const updatedData = {
        document_type_id: req.body.document_type_id || example.document_type_id,
        title: req.body.title || example.title,
        content: req.body.content || example.content,
        file_name: req.file ? decodedFileName : example.file_name,
        file_path: req.file ? req.file.path : example.file_path,
      };

      Example.update(updatedData, { where: { id: id } })
        .then((num) => {
          if (num == 1) {
            res.send({ message: "Example was updated successfully." });
          } else {
            res.send({
              message: `Cannot update Example with id=${id}. Maybe Example was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({ message: "Error updating Example with id=" + id });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Example with id=" + id });
    });
}];

// Delete an Example
exports.delete = (req, res) => {
  const id = req.params.id;

  Example.findByPk(id)
    .then((example) => {
      if (example && example.file_path) {
        fs.unlink(example.file_path, (err) => {
          if (err) console.error("Failed to delete file:", err);
          else console.log("File deleted:", example.file_path);
        });
      }
      return Example.destroy({ where: { id: id } });
    })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Example was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Example with id=${id}. Maybe Example was not found!` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete Example with id=" + id });
    });
};

// Delete all Examples
exports.deleteAll = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const examples = await Example.findAll({ transaction });

    for (const example of examples) {
      if (example.file_path) {
        fs.unlink(example.file_path, (err) => {
          if (err) console.error("Failed to delete file:", err);
        });
      }
    }

    await Example.destroy({ where: {}, truncate: false, transaction });
    await transaction.commit();
    res.send({ message: "All examples were deleted successfully!" });
  } catch (err) {
    await transaction.rollback();
    res.status(500).send({
      message: err.message || "Some error occurred while removing all examples.",
    });
  }
};
