import React from "react";
import { Button } from "../components/ui/button";
import { FaArrowRight, FaHeartbeat, FaPlay } from "react-icons/fa";
import { GiStethoscope } from "react-icons/gi";
import { MdInsights } from "react-icons/md";
import { Link } from "react-router-dom";

const Home = () => {
  const playVideo = () => {
    window.location.href =
      "https://drive.google.com/file/d/1WY5PLVVPntZC5ETLlvAgzHmXT-Xevp5t/view?usp=sharing";
  };
  return (
    <div className="lg:flex flex-row justify-between  ">
      <div className="p-4 lg:p-20 flex flex-col gap-8">
        <h1 className="flex flex-col gap-4 text-left text-6xl space-x-1 font-serif opacity-90 my-4">
          <span>Empower Your</span> <span>Health Journey with</span>
          <span className="group">
            <span className="text-blue-500 group-hover:text-purple-400">
              Health
            </span>
            <span className="text-purple-500 group-hover:text-blue-400">
              Sync!
            </span>
          </span>
        </h1>
        <p className="text-md opacity-70 font-sans lg:w-[50rem] my-4">
          Take control of your well-being with our intuitive health tracking
          app. Whether its monitoring vital signs, setting health goals, or
          viewing personalized insights, HealthSync is your trusted companion
          for a healthier, more balanced life.
        </p>
        <div className="my-4 flex flex-row gap-8">
          <Link to={"/dashboard"}>
            <Button
              variant="outline"
              size="lg"
              className="gap-1 bg-black text-white  ease-in-out hover:gap-2 items-center rounded-3xl"
            >
              Dashboard{" "}
              <span>
                <FaArrowRight />
              </span>
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="gap-1 transition delay-150 duration-300 ease-in-out  hover:bg-black hover:text-white items-center rounded-3xl"
            onClick={playVideo}
          >
            Demo{" "}
            <span>
              <FaPlay />
            </span>
          </Button>
        </div>
        <div className="my-4">
          <div className="flex flex-row gap-4 items-center">
            <FaHeartbeat className="bg-black text-white text-4xl p-2 rounded-full text-center hover:text-black hover:bg-white cursor-pointer border border-1 border-black" />
            <GiStethoscope className="bg-black text-white text-4xl p-2 rounded-full text-center hover:text-black hover:bg-white cursor-pointer border border-1 border-black" />
            <MdInsights className="bg-black text-white text-4xl p-2 rounded-full text-center hover:text-black hover:bg-white cursor-pointer border border-1 border-black" />
          </div>
          <p className="text-md opacity-70 font-sans lg:w-[50rem] my-4">
            Revolutionary Features for Your Ultimate Fitness Journey
          </p>
        </div>
      </div>
      <div>
        <img src="/assets/Herosectionimg.png" alt="HealthSync" />
      </div>
    </div>
  );
};

export default Home;
