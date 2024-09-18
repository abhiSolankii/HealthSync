import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import Card from "./Card";
import apiRequest from "@/lib/apiRequest";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useSearchParams } from "react-router-dom";

const DashRecords = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [healthRecords, setHealthRecords] = useState([]);
  const [visibleRecords, setVisibleRecords] = useState(6);

  // Filters dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [filterForm, setFilterForm] = useState({
    minDate: searchParams.get("minDate") || "",
    maxDate: searchParams.get("maxDate") || "",
    minHeartRate: searchParams.get("minHeartRate") || "",
    maxHeartRate: searchParams.get("maxHeartRate") || "",
    minSystolicBP: searchParams.get("minSystolicBP") || "",
    maxSystolicBP: searchParams.get("maxSystolicBP") || "",
    minDiastolicBP: searchParams.get("minDiastolicBP") || "",
    maxDiastolicBP: searchParams.get("maxDiastolicBP") || "",
    minBodyTemperature: searchParams.get("minBodyTemperature") || "",
    maxBodyTemperature: searchParams.get("maxBodyTemperature") || "",
  });

  const handleFilterFormChange = (e) => {
    const { name, value } = e.target;
    setFilterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e) => {
    e.preventDefault();

    // Set the query parameters using the filter form values
    const params = new URLSearchParams(filterForm).toString();
    console.log(params);
    setSearchParams(`${params}&tab=records`);
  };

  const handleVisibleCards = () => {
    setVisibleRecords((prev) => prev + 3);
  };

  useEffect(() => {
    const fetchHealthRecords = async () => {
      try {
        setLoading(true);
        const queryString = searchParams.toString();

        const response = await apiRequest.get(
          `/health-records/${currentUser._id}/all?${queryString}`
        );
        const healthRecords = response.data.records;

        setHealthRecords(healthRecords);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to get Health records!"
        );
        setLoading(false);
      }
    };

    if (currentUser && currentUser._id) {
      fetchHealthRecords();
    }
  }, [currentUser, searchParams]);

  return (
    <div className="p-4 w-full">
      <div>
        <h1 className="text-center my-2 text-2xl font-semibold">
          Health Records
        </h1>
      </div>
      <div className="">
        {/* Filters */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="w-full bg-purple-500 hover:bg-purple-400">
              Filters
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Adjust filters</DialogTitle>

            <form className="space-y-4" onSubmit={handleFilterChange}>
              <div>
                <label>Date</label>
                <div className="flex space-x-2">
                  <Input
                    type="date"
                    name="minDate"
                    placeholder="Minimum Date"
                    value={filterForm.minDate}
                    onChange={handleFilterFormChange}
                  />
                  <Input
                    type="date"
                    name="maxDate"
                    placeholder="Maximum Date"
                    value={filterForm.maxDate}
                    onChange={handleFilterFormChange}
                  />
                </div>
              </div>
              <div>
                <label>Heart Rate (bpm)</label>
                <div className="flex space-x-2">
                  <Input
                    name="minHeartRate"
                    placeholder="Minimum heart rate"
                    value={filterForm.minHeartRate}
                    onChange={handleFilterFormChange}
                  />
                  <Input
                    name="maxHeartRate"
                    placeholder="Maximum heart rate"
                    value={filterForm.maxHeartRate}
                    onChange={handleFilterFormChange}
                  />
                </div>
              </div>

              <div>
                <label>Blood Pressure (Systolic)</label>
                <div className="flex space-x-2">
                  <Input
                    name="minSystolicBP"
                    placeholder="Minimum systolic BP"
                    value={filterForm.minSystolicBP}
                    onChange={handleFilterFormChange}
                  />
                  <Input
                    name="maxSystolicBP"
                    placeholder="Maximum systolic BP"
                    value={filterForm.maxSystolicBP}
                    onChange={handleFilterFormChange}
                  />
                </div>
              </div>

              <div>
                <label>Blood Pressure (Diastolic)</label>
                <div className="flex space-x-2">
                  <Input
                    name="minDiastolicBP"
                    placeholder="Minimum diastolic BP"
                    value={filterForm.minDiastolicBP}
                    onChange={handleFilterFormChange}
                  />
                  <Input
                    name="maxDiastolicBP"
                    placeholder="Maximum diastolic BP"
                    value={filterForm.maxDiastolicBP}
                    onChange={handleFilterFormChange}
                  />
                </div>
              </div>

              <div>
                <label>Body Temperature (°F)</label>
                <div className="flex space-x-2">
                  <Input
                    name="minBodyTemperature"
                    placeholder="Minimum body temperature"
                    value={filterForm.minBodyTemperature}
                    onChange={handleFilterFormChange}
                  />
                  <Input
                    name="maxBodyTemperature"
                    placeholder="Maximum body temperature"
                    value={filterForm.maxBodyTemperature}
                    onChange={handleFilterFormChange}
                  />
                </div>
              </div>
              <DialogClose>
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-400"
                  disabled={loading}
                >
                  Apply filters
                </Button>
              </DialogClose>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="my-6 grid grid-cols-1 lg:grid-cols-3 items-center">
        {loading ? (
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
        ) : healthRecords.length > 0 ? (
          healthRecords
            .slice(0, visibleRecords)
            .map((record) => <Card key={record._id} record={record} />)
        ) : (
          <p className="text-center">No health records available</p>
        )}
      </div>

      {healthRecords.length > visibleRecords ? (
        <div className="flex justify-center w-full">
          <Button
            variant="outline"
            className="mx-auto"
            onClick={handleVisibleCards}
          >
            Load more
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DashRecords;
