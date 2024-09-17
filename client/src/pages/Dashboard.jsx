import DashCreateRecord from "@/components/DashCreateRecord";
import DashProfile from "@/components/DashProfile";
import DashRecord from "@/components/DashRecord";
import DashRecords from "@/components/DashRecords";
import DashSidebar from "@/components/DashSidebar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  console.log(tab);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);

  const tabComponents = {
    profile: <DashProfile />,
    records: <DashRecords />,
    createRecord: <DashCreateRecord />,
    record: <DashRecord />,
  };

  // Default to DashProfile if tab not found
  const CurrentTabComponent = tabComponents[tab] || <DashProfile />;

  return (
    <div className="lg:flex lg:flex-row">
      <div>
        <DashSidebar />
      </div>
      <div className="w-full">{CurrentTabComponent}</div>
    </div>
  );
};

export default Dashboard;
