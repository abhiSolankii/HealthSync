import jwt from "jsonwebtoken";
import HealthRecord from "../models/healthRecord.model.js";
import User from "../models/user.model.js";

export const getHealthRecords = async (req, res) => {
  const { userId } = req.params;
  const {
    minDate,
    maxDate,
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

    if (minDate || maxDate) {
      filters.date = {};
      if (minDate) {
        filters.date.$gte = new Date(minDate); // Set minimum date filter
      }
      if (maxDate) {
        filters.date.$lte = new Date(maxDate); // Set maximum date filter
      }
    }

    if (minHeartRate || maxHeartRate) {
      filters.heartRate = {};
      if (minHeartRate) {
        filters.heartRate.$gte = parseInt(minHeartRate, 10);
      }
      if (maxHeartRate) {
        filters.heartRate.$lte = parseInt(maxHeartRate, 10);
      }
    }

    if (minSystolicBP || maxSystolicBP) {
      filters["bloodPressure.systolic"] = {};
      if (minSystolicBP) {
        filters["bloodPressure.systolic"].$gte = parseInt(minSystolicBP, 10);
      }
      if (maxSystolicBP) {
        filters["bloodPressure.systolic"].$lte = parseInt(maxSystolicBP, 10);
      }
    }

    if (minDiastolicBP || maxDiastolicBP) {
      filters["bloodPressure.diastolic"] = {};
      if (minDiastolicBP) {
        filters["bloodPressure.diastolic"].$gte = parseInt(minDiastolicBP, 10);
      }
      if (maxDiastolicBP) {
        filters["bloodPressure.diastolic"].$lte = parseInt(maxDiastolicBP, 10);
      }
    }

    if (minBodyTemperature || maxBodyTemperature) {
      filters.bodyTemperature = {};
      if (minBodyTemperature) {
        filters.bodyTemperature.$gte = parseInt(minBodyTemperature, 10);
      }
      if (maxBodyTemperature) {
        filters.bodyTemperature.$lte = parseInt(maxBodyTemperature, 10);
      }
    }

    // Fetch user with the specified userId and apply filters to their health records
    const user = await User.findById(userId)
      .populate({
        path: "healthRecords",
        match: filters,
        select: "date note _id",
      })
      .select("-password");

    if (user) {
      res.status(200).send({ records: user.healthRecords });
    } else {
      res.status(404).send({ message: "User not found!" });
    }
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
  const { bodyTemperature, bloodPressure, heartRate, note } = req.body;
  const tokenUserId = req.userId;

  if (!bodyTemperature || !bloodPressure || !heartRate || !note)
    return res.status(400).send({ message: "All fields are required!" });

  try {
    // Create the new health record
    const newHealthRecord = new HealthRecord({
      userId: tokenUserId,
      date: new Date(),
      bodyTemperature,
      bloodPressure: {
        systolic: bloodPressure.systolic,
        diastolic: bloodPressure.diastolic,
      },
      heartRate,
      note,
    });

    if (newHealthRecord) {
      // Save the new health record
      await newHealthRecord.save();

      // Update the user's healthRecords array by adding the new health record's ObjectId
      await User.findByIdAndUpdate(
        tokenUserId,
        {
          $push: { healthRecords: newHealthRecord._id },
        },
        { new: true }
      );

      res.status(201).send({
        message: "Health record created",
        newHealthRecord,
      });
    } else {
      res.status(400).send({ message: "Invalid data!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error creating health record", error });
  }
};

export const updateHealthRecord = async (req, res) => {
  const id = req.params.id;
  const { bodyTemperature, bloodPressure, heartRate, note } = req.body;
  try {
    const data = { bodyTemperature, bloodPressure, heartRate, note };
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
