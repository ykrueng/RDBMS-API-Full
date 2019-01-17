const express = require("express");

const db = require("../../helpers/studentsDb");
const validateCohort = require("../common/validateCohort");
const validateStudentName = require("../common/validateStudentName");

const router = express.Router();

router
  .param("id", async (req, res, next, id) => {
    try {
      const student = await db.get(Number(id));
      if (!student) {
        next({ code: 400 });
      } else {
        req.student = student;
      }
      next();
    } catch (err) {
      next({ code: 500 });
    }
  })
  .post("/", validateCohort, validateStudentName, async (req, res, next) => {
    const { student } = req.body;
    try {
      const id = await db.insert(student);
      res.status(201).json({ id: id[0] });
    } catch (err) {
      next({ code: 500 });
    }
  })
  .get("/", async (req, res, next) => {
    try {
      const students = await db.get();
      res.status(200).json(students);
    } catch (err) {
      next({ code: 500 });
    }
  })
  .get("/:id", (req, res, next) => {
    res.status(200).json(req.student);
  })
  .put("/:id", validateCohort, validateStudentName, async (req, res, next) => {
    const { id } = req.params;
    const { student } = req.body;
    try {
      const count = await db.update(id, student);
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
    const { id } = req.params;
    try {
      const count = await db.remove(Number(id));
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