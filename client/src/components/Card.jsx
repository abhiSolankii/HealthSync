import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const HealthRecordCard = ({ record }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/dashboard?tab=record&id=${record._id}`);
  };

  return (
    <Card className="w-[90%] mx-auto max-w-md bg-white shadow-md rounded-lg p-2 mb-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800">
          Health Record
        </CardTitle>
        <CardDescription className="text-sm text-slate-500">
          {new Date(record.date).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-slate-700 font-medium">Note:</p>
          <p className="text-slate-600">{record.note}</p>
        </div>
        <Button
          onClick={handleViewClick}
          className="bg-blue-500 text-white hover:bg-blue-600 w-full"
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
};

export default HealthRecordCard;
