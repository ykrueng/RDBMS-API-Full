const express = require("express");

const db = require("../../helpers/cohortsDb");
const checkName = require("../common/checkName");

const router = express.Router();

router
  .param("id", async (req, res, next, id) => {
    try {
      const cohort = await db.get(Number(id));
      if (!cohort) {
        next({ code: 400 });
      } else {
        req.cohort = cohort;
      }
      next();
    } catch (err) {
      next({ code: 500 });
    }
  })
  .post("/", checkName, async (req, res, next) => {
    const { name } = req.body;
    try {
      const id = await db.insert({ name });
      res.status(201).json({ id: id[0] });
    } catch (err) {
      next({ code: 500 });
    }
  })
  .get("/", async (req, res, next) => {
    try {
      const cohort = await db.get();
      res.status(200).json(cohort);
    } catch (err) {
      next({ code: 500 });
    }
  })
  .get("/:id", (req, res, next) => {
    res.status(200).json(req.cohort);
  })
  .get("/:id/students", async (req, res, next) => {
    const { id } = req.params;
    try {
      const students = await db.getCohortStudents(Number(id));
      res.status(200).json(students);
    } catch (err) {
      next({ code: 500 });
    }
  })
  .put("/:id", checkName, async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const count = await db.update(id, { name });
      if (count === 1) {
        res.sendStatus(204);
      } else {
        next({ code: 500 });
      }
    } catch (err) {
      next({ code: 500 });
    }
  })
  .delete("/:id", async (req, res, next) => {
    try {
      const count = await db.remove(Number(req.params.id));
      if (count === 1) {
        res.sendStatus(204);
      } else {
        next({ code: 500 });
      }
    } catch (err) {
      next({ code: 500 });
    }
  });

module.exports = router;