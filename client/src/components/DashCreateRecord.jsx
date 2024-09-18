import React, { useContext, useEffect, useState } from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import apiRequest from "@/lib/apiRequest";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const DashCreateRecord = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bodyTemperature: null,
    bloodPressure: {
      systolic: null,
      diastolic: null,
    },
    heartRate: null,
    note: "",
  });

  //handle blood pressure change

  const handleBloodPressureChange = (e) => {
    setFormData({
      ...formData,
      bloodPressure: {
        ...formData.bloodPressure,
        [e.target.name]: e.target.value.trim(),
      },
    });
  };
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });

  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await apiRequest.post("/health-records", formData, {
        "Content-Type": "application/json",
      });

      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/dashboard?tab=records");
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error creating health record"
      );
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-8 mt-4 bg-slate-50 rounded-lg shadow-md">
      <div className="text-3xl text-center font-bold space-x-1 font-serif hover:opacity-80">
        <p>Create Your Health Record with</p>
        <p className="text-blue-500">
          Health
          <span className="text-purple-600">Sync</span>
        </p>
      </div>
      <div className="w-full space-y-4">
        <p className="text-lg text-slate-600 text-center mb-4">
          Keep track of your vital health metrics effortlessly with HealthSync.
          Fill in the fields below to create a new health record:
        </p>

        <form onSubmit={handleSubmit}>
          {/* Body Temperature */}
          <div>
            <Label htmlFor="bodyTemperature" className="text-slate-700">
              Body Temperature {"(°F)"}
            </Label>
            <Input
              onChange={handleChange}
              required
              name="bodyTemperature"
              type="number"
              step="0.1"
              placeholder="Enter your body temperature"
              className="mt-1 mb-2"
            />
            <p className="text-sm text-slate-500">Normal range: 97°F to 99°F</p>
          </div>

          {/* Blood Pressure */}
          <div>
            <Label htmlFor="systolic" className="text-slate-700">
              Systolic Blood Pressure (mmHg)
            </Label>
            <Input
              onChange={handleBloodPressureChange}
              required
              name="systolic"
              type="number"
              placeholder="Enter your systolic blood pressure"
              className="mt-1 mb-2"
            />
            <Label htmlFor="diastolic" className="text-slate-700">
              Diastolic Blood Pressure (mmHg)
            </Label>
            <Input
              onChange={handleBloodPressureChange}
              required
              name="diastolic"
              type="number"
              placeholder="Enter your diastolic blood pressure"
              className="mt-1 mb-2"
            />
            <p className="text-sm text-slate-500">
              Normal range: 90/60 mmHg to 120/80 mmHg
            </p>
          </div>

          {/* Heart Rate */}
          <div>
            <Label htmlFor="heartRate" className="text-slate-700">
              Heart Rate (bpm)
            </Label>
            <Input
              onChange={handleChange}
              required
              name="heartRate"
              type="number"
              placeholder="Enter your heart rate"
              className="mt-1 mb-2"
            />
            <p className="text-sm text-slate-500">
              Normal range: 60 to 100 bpm (resting)
            </p>
          </div>
          {/* note  */}
          <div>
            <Label htmlFor="heartRate" className="text-slate-700">
              Note
            </Label>
            <Input
              onChange={handleChange}
              required
              name="note"
              type="text"
              placeholder="Enter note about your health"
              className="mt-1 mb-2"
            />
            <p className="text-sm text-slate-500">
              Can be used to remeber things
            </p>
          </div>

          <Button
            type="submit"
            className="mt-4 bg-blue-500 text-white hover:bg-blue-600"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <span>Submitting record...</span>
              </>
            ) : (
              <p>Submit record</p>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DashCreateRecord;
