import React, { useContext } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { AuthContext } from "../context/AuthContext";
import { Button } from "./ui/button";
import { FaEdit } from "react-icons/fa";

const DashProfile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex flex-col justify-center p-4 w-full gap-10 mt-10 ">
      <div className="hidden lg:flex">
        <Avatar className="w-16 h-16 lg:w-28 lg:h-28 mx-auto border-2 border-double border-purple-400 border-opacity-60 transition delay-100 duration-300 hover:border-purple-600 hover:scale-105 hover:border-4">
          <AvatarImage
            src={currentUser.profilePicture}
            className=""
            alt="..."
          />
          <AvatarFallback>Pfp</AvatarFallback>
        </Avatar>
      </div>
      <div className="">
        <div className="bg-slate-200 grid grid-cols-3 text-center justify-between lg:w-[60%] mx-auto p-4 rounded-md pl-8 pr-8">
          <p className="text-slate-600">Name</p>
          <span className="opacity-50">:</span>
          <p className="font-semibold text-slate-700">{currentUser.fullname}</p>
        </div>
        <div className=" grid grid-cols-3 text-center justify-between lg:w-[60%] mx-auto p-4 rounded-md pl-8 pr-8">
          <p className="text-slate-600">Username</p>
          <span className="opacity-50">:</span>
          <p className="font-semibold text-slate-700">
            @{currentUser.username}
          </p>
        </div>
        <div className="bg-slate-200 grid grid-cols-3 text-center justify-between lg:w-[60%] mx-auto p-4 rounded-md pl-8 pr-8">
          <p className="text-slate-600">Email</p>
          <span className="opacity-50">:</span>
          <p className="font-semibold text-slate-700">{currentUser.email}</p>
        </div>
        <div className=" grid grid-cols-3 text-center justify-between lg:w-[60%] mx-auto p-4 rounded-md pl-8 pr-8">
          <p className="text-slate-600">Profile created</p>
          <span className="opacity-50">:</span>
          <p className="font-semibold text-slate-700">
            {currentUser.createdAt.slice(0, 10)}
          </p>
        </div>
        <div className="bg-slate-200 grid grid-cols-3 text-center justify-between lg:w-[60%] mx-auto p-4 rounded-md pl-8 pr-8">
          <p className="text-slate-600">No. of records</p>
          <span className="opacity-50">:</span>
          <p className="font-semibold text-slate-700">
            {currentUser.healthRecords.length}
          </p>
        </div>

        <div className=" flex flex-row justify-between lg:w-[65%] mx-auto p-4 rounded-md pl-8 pr-8 my-4">
          <Button
            className="mx-auto w-full bg-blue-400 hover:bg-blue-300 flex items-center gap-1 p-6"
            variant="outline"
          >
            <span>
              <FaEdit />
            </span>
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashProfile;
