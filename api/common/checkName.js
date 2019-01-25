const db = require("../../helpers/cohortsDb");

module.exports = async (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== "string" || name.length > 255) {
    next({ code: 400 });
  } else {
    const cohorts = await db.get();

    if (cohorts.find(cohort => cohort.name === name)) {
      next({ code: 400 });
    } else {
      next();
    }
  }
};