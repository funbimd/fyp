import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { FaWhatsapp, FaFacebook, FaSnapchat, FaCopy } from "react-icons/fa";

const InfoSection = ({ trip }) => {
  const [showShare, setShowShare] = useState(false);
  const shareRef = useRef(null);
  const shareableLink = `${window.location.origin}/view-trip/${trip.id}`;

  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink);
    alert("Link copied to clipboard! 📋");
  };

  // Close the share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShare(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📆 {trip.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🧑🏿‍🤝‍🧑🏿 No. of Travelers: {trip.userSelection?.traveler}
            </h2>
          </div>
        </div>

        {/* Share Button and Dialog */}
        <div className="relative" ref={shareRef}>
          <Button onClick={() => setShowShare(true)}>
            <AiOutlineSend />
          </Button>

          {/* Share Menu */}
          {showShare && (
            <div className="absolute right-0 mt-3 w-56 bg-white shadow-lg rounded-lg p-4 z-50">
              <p className="text-sm text-gray-600 font-semibold mb-3 text-center">
                Share this trip:
              </p>

              <div className="flex justify-between items-center">
                {/* WhatsApp */}
                <a
                  href={`https://api.whatsapp.com/send?text=Check out my trip: ${shareableLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 text-2xl hover:scale-110 transition-transform"
                >
                  <FaWhatsapp />
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareableLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-2xl hover:scale-110 transition-transform"
                >
                  <FaFacebook />
                </a>

                {/* Snapchat */}
                <a
                  href={`https://www.snapchat.com/share?url=${shareableLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 text-2xl hover:scale-110 transition-transform"
                >
                  <FaSnapchat />
                </a>

                {/* Copy to Clipboard */}
                <button
                  onClick={copyToClipboard}
                  className="text-gray-700 text-2xl hover:scale-110 transition-transform"
                >
                  <FaCopy />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
