import { useState, useEffect, useContext } from "react";

//schadcm import
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FaCog,
  FaFile,
  FaFileAlt,
  FaLifeRing,
  FaLock,
  FaPlus,
  FaSignOutAlt,
  FaUserAlt,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "@/lib/apiRequest";
import toast from "react-hot-toast";

const DashSidebar = () => {
  const { updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [tab, setTab] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);
  const { currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await apiRequest.post("/auth/signout");
      toast.success(response.data.message);
      updateUser(null);
      navigate("/");
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to sign out!");
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="w-full h-full lg:w-[20rem] lg:min-h-screen bg-slate-100 p-4 font-serif border border-1 border-shrink-0 border-neutral-200 ">
        {/* basic user info */}
        <div className="flex flex-col gap-2">
          <Avatar className="w-16 h-16 lg:w-28 lg:h-28 mx-auto border-2 border-double border-purple-400 border-opacity-60 transition delay-100 duration-300 hover:border-purple-600 hover:scale-105 hover:border-4">
            <AvatarImage
              src={currentUser.profilePicture}
              className=""
              alt="..."
            />
            <AvatarFallback>Pfp</AvatarFallback>
          </Avatar>
          <p className="text-center text-xl ">
            Hello,{" "}
            <span className="text-purple-500">{currentUser.fullname}</span>!
          </p>
        </div>
        <Separator className="my-4 lg:my-8" />
        {/* different tabs */}
        <div className="flex flex-col gap-2 lg:gap-4">
          <Link to={"/dashboard?tab=profile"}>
            <Button
              variant={tab === "profile" ? "default" : "outline"}
              className="w-full gap-2 items-center"
            >
              <FaUserAlt /> Profile
            </Button>
          </Link>
          <Link to={"/dashboard?tab=records"}>
            <Button
              variant={tab === "records" ? "default" : "outline"}
              className="w-full gap-2 items-center"
            >
              <FaFileAlt /> Records
            </Button>
          </Link>
          <Link to={"/dashboard?tab=createRecord"}>
            <Button
              variant={tab === "createRecord" ? "default" : "outline"}
              className="w-full gap-2 items-center"
            >
              <FaPlus /> Create Record
            </Button>
          </Link>
        </div>
        <Separator className="my-4 lg:my-8" />
        {/* sidebar footer */}
        <div className="flex flex-col gap-2 lg:gap-4">
          <Button
            variant="destructive"
            className="w-full gap-2 items-center"
            onClick={handleLogout}
            disable={loading}
          >
            <FaSignOutAlt /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashSidebar;
