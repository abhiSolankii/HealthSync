import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import apiRequest from "@/lib/apiRequest";
import toast from "react-hot-toast";

const DashRecord = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(false);
  const [healthRecord, setHealthRecord] = useState(null);
  const [editRecord, setEditRecord] = useState({
    bloodPressure: {
      systolic: healthRecord?.bloodPressure.systolic,
      diastolic: healthRecord?.bloodPressure.diastolic,
    },
    bodyTemperature: "",
    heartRate: "",
    note: "",
  });
  const [openDialog, setOpenDialog] = useState(false);

  //handle blood pressure change

  const handleBloodPressureChange = (e) => {
    setEditRecord({
      ...editRecord,
      bloodPressure: {
        ...editRecord.bloodPressure,
        [e.target.name]: e.target.value.trim(),
      },
    });
  };
  // Fetch the health record data when the page loads
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        setLoading(true);
        if (!id) {
          return;
        }
        const response = await apiRequest.get(`/health-records/${id}`);
        setHealthRecord(response.data.healthRecord);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(
          error.response?.data?.message || "Failed to fetch health record!"
        );
      }
    };
    fetchRecord();
  }, [id]);

  // Handle input changes for editing the health record
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditRecord((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (healthRecord) {
      setEditRecord({
        bloodPressure: {
          systolic: healthRecord.bloodPressure.systolic,
          diastolic: healthRecord.bloodPressure.diastolic,
        },
        bodyTemperature: healthRecord.bodyTemperature,
        heartRate: healthRecord.heartRate,
        note: healthRecord.note,
      });
    }
  }, [healthRecord]);
  // Update health record API call
  const handleUpdateRecord = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await apiRequest.put(`/health-records/${id}`, editRecord);
      toast.success("Health record updated successfully!");
      setOpenDialog(false);
      const response = await apiRequest.get(`/health-records/${id}`);
      setHealthRecord(response.data.healthRecord);
      setLoading(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update health record!"
      );
      setLoading(false);
    }
  };

  if (!healthRecord) {
    return (
      <div className="items-center text-center flex justify-center mt-20">
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
      </div>
    );
  }

  return (
    <div className="p-4 w-full">
      <h1 className="text-center my-4 text-2xl font-semibold">
        Health Record Details
      </h1>
      <div className="space-y-4">
        <p>
          <strong>Date:</strong> {new Date(healthRecord.date).toLocaleString()}
        </p>
        <p>
          <strong>Blood Pressure:</strong> {healthRecord.bloodPressure.systolic}{" "}
          / {healthRecord.bloodPressure.diastolic} mmHg
        </p>
        <p>
          <strong>Body Temperature:</strong> {healthRecord.bodyTemperature} °F
        </p>
        <p>
          <strong>Heart Rate:</strong> {healthRecord.heartRate} bpm
        </p>
        <p>
          <strong>Note:</strong> {healthRecord.note}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(healthRecord.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Last Updated:</strong>{" "}
          {new Date(healthRecord.updatedAt).toLocaleString()}
        </p>

        {/* Dialog Trigger to Edit the Record */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-400"
              disable={loading}
            >
              Update Health Record
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Edit Health Record</DialogTitle>

            <form className="space-y-4" onSubmit={handleUpdateRecord}>
              <div>
                <label>Blood Pressure (Systolic / Diastolic)</label>
                <div className="flex space-x-2">
                  <Input
                    required
                    name="systolic"
                    placeholder="Systolic"
                    value={editRecord.bloodPressure.systolic}
                    onChange={handleBloodPressureChange}
                  />
                  <Input
                    required
                    name="diastolic"
                    placeholder="Diastolic"
                    value={editRecord.bloodPressure.diastolic}
                    onChange={handleBloodPressureChange}
                  />
                </div>
              </div>

              <div>
                <label>Body Temperature (°F)</label>
                <Input
                  required
                  name="bodyTemperature"
                  value={editRecord.bodyTemperature}
                  onChange={handleInputChange}
                  placeholder="Body Temperature"
                />
              </div>

              <div>
                <label>Heart Rate (bpm)</label>
                <Input
                  required
                  name="heartRate"
                  value={editRecord.heartRate}
                  onChange={handleInputChange}
                  placeholder="Heart Rate"
                />
              </div>

              <div>
                <label>Note</label>
                <Input
                  required
                  name="note"
                  value={editRecord.note}
                  onChange={handleInputChange}
                  placeholder="Add a note"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-400"
                disable={loading}
              >
                Save Changes
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DashRecord;
