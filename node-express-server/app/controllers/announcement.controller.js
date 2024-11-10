const db = require("../models");
const Announcement = db.announcement;

exports.create = (req, res) => {
  const announcement = {
    title: req.body.title,
    content: req.body.content,
    createdBy: req.body.createdBy,
  };

  Announcement.create(announcement)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Announcement.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// exports.findOne = (req, res) => {
//   const id = req.params.id;
//     console.log(id);
//   Announcement.findByPk(id)
//     .then(data => {
//       if (data) res.send(data);
//       else res.status(404).send({ message: "Not found" });
//     })
//     .catch(err => res.status(500).send({ message: err.message }));
// };
// Find a single Submission with an id
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
exports.update = (req, res) => {
  const id = req.params.id;

  Announcement.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Updated successfully" });
      else res.send({ message: `Cannot update Announcement with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Announcement.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Deleted successfully" });
      else res.send({ message: `Cannot delete Announcement with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};