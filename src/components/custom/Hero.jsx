import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h2 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI:
        </span>
        <br></br>Personalized Itineraies at You Fingertips
      </h2>
      <p className="text-xl text-gray-500 text-center">
        Your personal trip planner and travel curator, creating custom
        itenraries tailored to your interests and budgets.
      </p>
      <Link to={"/create-trip"}>
        <Button>Get started, It's free</Button>
      </Link>
      <img src="" className="-mt-20" />
    </div>
  );
};

export default Hero;
