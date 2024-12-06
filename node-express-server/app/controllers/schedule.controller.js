const db = require("../models");
const Schedule = db.schedule;

// 전체 일정 조회
exports.findAll = async (req, res) => {
  try {
    const schedules = await Schedule.findAll();
    res.send(schedules);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 일정 생성
exports.create = async (req, res) => {
  try {
    const { title, start_date, end_date, progress } = req.body;
    if (!title || !start_date || !end_date) {
      return res.status(400).send({ message: "모든 필드를 입력하세요." });
    }

    const schedule = await Schedule.create({ title, start_date, end_date, progress });
    res.send(schedule);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 특정 일정 수정
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, start_date, end_date, progress } = req.body;

    const [updated] = await Schedule.update(
      { title, start_date, end_date, progress },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).send({ message: "일정을 찾을 수 없습니다." });
    }

    res.send({ message: "일정이 수정되었습니다." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 일정 삭제
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Schedule.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).send({ message: "일정을 찾을 수 없습니다." });
    }

    res.send({ message: "일정이 삭제되었습니다." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};