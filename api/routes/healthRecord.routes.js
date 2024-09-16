import express from "express";
import {
  createHealthRecord,
  getHealthRecords,
  getHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
} from "../controllers/healthRecord.controller.js";

const router = express.Router();

router.post("/", createHealthRecord);
router.get("/", getHealthRecords);
router.get("/:id", getHealthRecord);
router.put("/:id", updateHealthRecord);
router.delete("/:id", deleteHealthRecord);

export default router;
