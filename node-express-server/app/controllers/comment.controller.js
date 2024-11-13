const db = require("../models");
const Comment = db.comment;

// 댓글 추가
// comment.controller.js

exports.create = (req, res) => {
  const { announcementId } = req.params;
  const { commenter, content } = req.body;
  console.log(req.body);

  const comment = {
      announcement_id: announcementId,
      commenter,
      content,
  };

  Comment.create(comment)
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err.message }));
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
  const { content } = req.body; // req.body에서 content 추출

  // 댓글 내용이 존재하는지 확인
  if (!content) {
    return res.status(400).send({ message: "Content cannot be empty!" });
  }

  Comment.update(
    { content }, // 업데이트할 필드 명시
    { where: { id: commentId, announcement_id: announcementId } }
  )
    .then(num => {
      if (num[0] === 1) { // Sequelize는 배열 형태로 [numUpdated]을 반환
        res.send({ message: "Comment was updated successfully." });
      } else {
        res.send({ message: `Cannot update Comment with id=${commentId}. Comment may not exist or no change detected.` });
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
