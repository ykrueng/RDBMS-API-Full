const db = require("../../helpers/studentsDb");

module.exports = async (req, res, next) => {
  const { student } = req.body;
  if (!student) {
    next({ code: 400 });
  } else if (!student.name) {
    next();
  } else if (typeof student.name !== "string" || student.name.length > 255) {
    next({ code: 400 });
  } else {
    const students = await db.get();

    if (students.find(studentDb => studentDb.name === student.name)) {
      next({ code: 400 });
    } else {
      next();
    }
  }
};