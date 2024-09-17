import mongoose from "mongoose";

const healthRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    bodyTemperature: {
      type: Number,
      required: true,
    },
    bloodPressure: {
      systolic: {
        type: Number,
        required: true,
      },
      diastolic: {
        type: Number,
        required: true,
      },
    },
    heartRate: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const HealthRecord = mongoose.model("HealthRecord", healthRecordSchema);
export default HealthRecord;
