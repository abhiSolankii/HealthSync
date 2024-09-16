import jwt from "jsonwebtoken";
import HealthRecord from "../models/healthRecord.model.js";

export const getHealthRecords = async (req, res) => {
  const {
    date,
    minHeartRate,
    maxHeartRate,
    minSystolicBP,
    maxSystolicBP,
    minDiastolicBP,
    maxDiastolicBP,
    minBodyTemperature,
    maxBodyTemperature,
  } = req.query;

  try {
    // Create a dynamic filter object based on the query parameters
    const filters = {};

    // Filter by date if provided
    if (date) {
      filters.date = new Date(date);
    }

    // Filter by heart rate range if provided
    if (minHeartRate || maxHeartRate) {
      filters.heartRate = {};
      if (minHeartRate) {
        filters.heartRate.$gte = parseInt(minHeartRate);
      }
      if (maxHeartRate) {
        filters.heartRate.$lte = parseInt(maxHeartRate);
      }
    }

    // Filter by systolic blood pressure range if provided
    if (minSystolicBP || maxSystolicBP) {
      filters["bloodPressure.systolic"] = {};
      if (minSystolicBP) {
        filters["bloodPressure.systolic"].$gte = parseInt(minSystolicBP);
      }
      if (maxSystolicBP) {
        filters["bloodPressure.systolic"].$lte = parseInt(maxSystolicBP);
      }
    }

    // Filter by diastolic blood pressure range if provided
    if (minDiastolicBP || maxDiastolicBP) {
      filters["bloodPressure.diastolic"] = {};
      if (minDiastolicBP) {
        filters["bloodPressure.diastolic"].$gte = parseInt(minDiastolicBP);
      }
      if (maxDiastolicBP) {
        filters["bloodPressure.diastolic"].$lte = parseInt(maxDiastolicBP);
      }
    }

    // Filter by body temperature range if provided
    if (minBodyTemperature || maxBodyTemperature) {
      filters.bodyTemperature = {};
      if (minBodyTemperature) {
        filters.bodyTemperature.$gte = parseInt(minBodyTemperature);
      }
      if (maxBodyTemperature) {
        filters.bodyTemperature.$lte = parseInt(maxBodyTemperature);
      }
    }

    // Find records based on the dynamic filter object
    const healthRecords = await HealthRecord.find(filters);

    res.status(200).send({ records: healthRecords });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving health records", error });
  }
};

export const getHealthRecord = async (req, res) => {
  const id = req.params.id;
  try {
    const healthRecord = await HealthRecord.findById(id);
    if (healthRecord) {
      res.status(200).send({ healthRecord });
    } else {
      res.status(404).send({ message: "Record not found!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error retrieving health record" });
  }
};

export const createHealthRecord = async (req, res) => {
  const { bodyTemperature, bloodPressure, heartRate } = req.body;
  const tokenUserId = req.userId;

  if (!bodyTemperature || !bloodPressure || !heartRate)
    return res.status(400).send({ message: "All fields are required!" });
  try {
    const newHealthRecord = new HealthRecord({
      userId: tokenUserId,
      date: new Date(),
      bodyTemperature,
      bloodPressure: {
        systolic: bloodPressure.systolic,
        diastolic: bloodPressure.diastolic,
      },
      heartRate,
    });

    if (newHealthRecord) {
      await newHealthRecord.save();
      res
        .status(201)
        .send({ message: "Health record created!", newHealthRecord });
    } else {
      res.status(400).send({ message: "Invalid data!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error creating health record", error });
  }
};

export const updateHealthRecord = async (req, res) => {
  const id = req.params.id;
  const { bodyTemperature, bloodPressure, heartRate } = req.body;
  try {
    const data = { bodyTemperature, bloodPressure, heartRate };
    const healthRecord = await HealthRecord.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (healthRecord) {
      res.status(200).send({ message: "Health record updated!", healthRecord });
    } else {
      res.status(404).send({ message: "Inavlid data" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error updating health record", error });
  }
};

export const deleteHealthRecord = async (req, res) => {
  const id = req.params.id;
  try {
    await HealthRecord.findByIdAndDelete(id);
    res.status(200).send({ message: "Health record deleted!" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting Health record", error });
  }
};
