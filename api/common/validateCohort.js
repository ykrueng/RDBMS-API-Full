const db = require("../../helpers/cohortsDb");

module.exports = async (req, res, next) => {
  const { student } = req.body;
  if (!student) {
    next({ code: 400 });
  } else if (!student.cohort_id) {
    next();
  } else if (typeof student.cohort_id !== "number") {
    next({ code: 400 });
  } else {
    const cohorts = await db.get();

    if (cohorts.find(cohort => cohort.id === student.cohort_id)) {
      next();
    } else {
      next({ code: 400 });
    }
  }
};