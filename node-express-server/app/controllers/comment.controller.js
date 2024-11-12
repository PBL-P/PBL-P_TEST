const db = require("../models");
const Comment = db.comment;

// 댓글 추가
exports.create = (req, res) => {
  const { announcementId } = req.params;
  const { commenter, content } = req.body;

  const comment = {
    announcement_id: announcementId,
    commenter,
    content,
  };

  Comment.create(comment)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// 특정 공지사항의 모든 댓글 조회
exports.findAll = (req, res) => {
  const { announcementId } = req.params;

  Comment.findAll({ where: { announcement_id: announcementId } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// 특정 댓글 수정
exports.update = (req, res) => {
  const { announcementId, commentId } = req.params;

  Comment.update(req.body, { where: { id: commentId, announcement_id: announcementId } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Comment was updated successfully." });
      } else {
        res.send({ message: `Cannot update Comment with id=${commentId}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// 특정 댓글 삭제
exports.delete = (req, res) => {
  const { announcementId, commentId } = req.params;

  Comment.destroy({ where: { id: commentId, announcement_id: announcementId } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Comment was deleted successfully." });
      } else {
        res.send({ message: `Cannot delete Comment with id=${commentId}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};
